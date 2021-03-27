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
import { CommunityNavProps, EtcNavProps } from "../../../navigation/ParamList";
import {
  GetHomepageListReq,
  GetHomepageListRes,
  GetPostsReq,
  GetPostsRes,
  GET_HOMEPAGE_LIST,
  GET_POSTS,
} from "../../../graphql/queries";
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
import { HomepageList, Posts } from "../../../models";
import { RefreshControl } from "react-native";

export const BoardListScreen: React.FC<EtcNavProps<"BoardList">> = ({
  navigation,
  route: {
    params: { board },
  },
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [contentLoading, setContentLoading] = useState<boolean>(false);
  const [moreLoading, setMoreLoading] = useState<boolean>(false);
  const { loading, error, data, refetch, fetchMore } = useQuery<
    GetHomepageListRes,
    GetHomepageListReq
  >(GET_HOMEPAGE_LIST, {
    variables: {
      board,
      page: 1,
    },
    // fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });

  const reloadList = async () => {
    setCurrentPage(1);
    setContentLoading(true);
    try {
      const res = await refetch({ board, page: 1 });
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

          const previousEdges = previousResult.homepageList;
          const fetchMoreEdges = fetchMoreResult.homepageList;

          fetchMoreResult.homepageList = [...previousEdges, ...fetchMoreEdges];

          return { ...fetchMoreResult };
        },
        variables: {
          board,
          page: currentPage + 1,
        },
      });
    } catch (e) {
      alert("에러");
    }
    setCurrentPage((v) => v + 1);
    setMoreLoading(false);
  };

  if ((loading || contentLoading) && !moreLoading)
    return (
      <Block flex center middle>
        <Loading />
      </Block>
    );
  if (error)
    return (
      <Block flex center middle>
        <Text>로딩중 에러가 발생하였습니다</Text>
      </Block>
    );
  if (data && data.homepageList.length < 1)
    return (
      <Block flex center middle>
        <Empty width={200} height={200} />
        <Text title bold>
          글이 존재하지 않습니다
        </Text>
      </Block>
    );

  const handleClick = (id: number) =>
    navigation.navigate("Detail", { board, id });

  return (
    <Container safearea={false} horizontalPadding={false} paddingBottom={false}>
      <FlatList
        data={data ? data.homepageList : []}
        refreshControl={
          <RefreshControl refreshing={contentLoading} onRefresh={reloadList} />
        }
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({
          item: d,
          index,
        }: {
          item: HomepageList;
          index: number;
        }) => (
          <Card shadow marginTop margin={[0, theme.sizes.base * 2]} style={{}}>
            <TouchableOpacity onPress={() => handleClick(d.id)}>
              <Text bold>{d.title}</Text>
              <Text style={{ marginTop: theme.sizes.base / 6 }}>{`${
                compareDesc(parseTime(d.createAt), subMonths(new Date(), 1)) ===
                1
                  ? format(parseTime(d.createAt), "yyyy년 M월 d일")
                  : formatDistanceToNow(parseTime(d.createAt), {
                      locale: ko,
                    }) + " 전"
              } / 작성자: ${d.writtenBy}`}</Text>
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
