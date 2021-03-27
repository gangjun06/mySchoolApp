import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Container } from "../../../components/containers";
import { Block, Button, Card, Loading, Text } from "../../../components/basic";
import { AuthContext } from "../../../components/providers/AuthProvider";
import { CommunityNavProps } from "../../../navigation/ParamList";
import { GetPostsReq, GetPostsRes, GET_POSTS } from "../../../graphql/queries";
import { useQuery } from "react-apollo";
import Empty from "../../../../assets/images/empty.svg";
import {
  compareAsc,
  compareDesc,
  format,
  formatDistanceToNow,
  subDays,
  subMonths,
} from "date-fns/esm";
import { ko } from "date-fns/locale";
import { parseTime } from "../../../utils/parse";
import { theme } from "../../../constants";
import { Feather } from "@expo/vector-icons";
import { Posts } from "../../../models";
import { RefreshControl } from "react-native";

export const ListScreen: React.FC<CommunityNavProps<"List">> = ({
  navigation,
  route: {
    params: { category },
  },
}) => {
  const { user } = useContext(AuthContext);

  const limit = useMemo(() => 20, []);
  const [postList, setPostList] = useState<Posts[]>([]);
  const [contentLoading, setContentLoading] = useState<boolean>(false);
  const [moreLoading, setMoreLoading] = useState<boolean>(false);
  const { loading, error, data, refetch, fetchMore } = useQuery<
    GetPostsRes,
    GetPostsReq
  >(GET_POSTS, {
    variables: {
      categoryID: category.id,
      limit: limit,
      offset: 0,
    },
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (loading || error || !data) return;
    setPostList(data.posts);
  }, [data]);

  const writePost = () => {
    navigation.navigate("Write", {
      category,
      afterWrite: reloadList,
    });
  };

  const reloadList = async () => {
    setContentLoading(true);
    try {
      const res = await refetch({ categoryID: category.id, offset: 0, limit });
      setPostList(res.data.posts);
    } catch (e) {
      alert("에러");
    }
    setContentLoading(false);
  };

  const loadMore = async () => {
    setMoreLoading(true);
    try {
      const res = await fetchMore({
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }

          const previousEdges = previousResult.posts;
          const fetchMoreEdges = fetchMoreResult.posts;

          fetchMoreResult.posts = [...previousEdges, ...fetchMoreEdges];

          return { ...fetchMoreResult };
        },
        variables: {
          categoryID: category.id,
          offset: postList.length,
          limit,
        },
      });
    } catch (e) {
      alert("에러");
    }
    setMoreLoading(false);
  };

  useLayoutEffect(() => {
    if (
      category.reqPermission.length < 1 &&
      category.writeAbleRole.includes(user.role!)
    )
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={writePost}>
            <Feather name="file-plus" size={theme.sizes.base * 1.4} />
          </TouchableOpacity>
        ),
      });
  }, [navigation]);

  if ((loading || contentLoading) && !moreLoading)
    return (
      <Block flex center middle>
        <Loading />
      </Block>
    );
  if (error)
    return (
      <Block flex center middle>
        {" "}
        <Text>로딩중 에러가 발생하였습니다</Text>
      </Block>
    );
  if (data && data.posts.length < 1)
    return (
      <Block flex center middle>
        <Empty width={200} height={200} />
        <Text title bold>
          글이 존재하지 않습니다
        </Text>
      </Block>
    );

  const handleClick = (post: string) => {
    navigation.push("Detail", { post });
  };

  return (
    <Container safearea={false} horizontalPadding={false}>
      <FlatList
        data={data ? data.posts : []}
        refreshControl={
          <RefreshControl refreshing={contentLoading} onRefresh={reloadList} />
        }
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item: d }: { item: Posts; index: number }) => (
          <Card shadow marginTop margin={[0, theme.sizes.base * 2]} style={{}}>
            <TouchableOpacity onPress={() => handleClick(d.id)}>
              <Text bold>{d.title}</Text>
              <Text style={{ marginTop: theme.sizes.base / 6 }}>{`${
                compareDesc(parseTime(d.createAt), subMonths(new Date(), 1)) ===
                1
                  ? format(parseTime(d.createAt), "yyyy년 M월 d일(h시 m분)")
                  : formatDistanceToNow(parseTime(d.createAt), {
                      locale: ko,
                    }) + " 전"
              } / 작성자: ${d.author.name} ${
                d.createAt !== d.updateAt ? "(수정됨)" : ""
              }`}</Text>
            </TouchableOpacity>
          </Card>
        )}
        ListFooterComponent={
          <Button
            style={{
              marginTop: theme.sizes.base,
              marginHorizontal: theme.sizes.base * 2,
              marginBottom: theme.sizes.padding,
              paddingHorizontal: theme.sizes.base,
            }}
            onPress={loadMore}
            disabled={moreLoading}
            shadow
            loading={moreLoading}
          >
            <Text bold>글 더 불러오기</Text>
          </Button>
        }
      />
    </Container>
  );
};
