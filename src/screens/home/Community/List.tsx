import React, { useContext, useEffect, useLayoutEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Container } from "../../../components/containers";
import { Block, Card, Loading, Text } from "../../../components/basic";
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

export const ListScreen: React.FC<CommunityNavProps<"List">> = ({
  navigation,
  route: {
    params: { category },
  },
}) => {
  const { user } = useContext(AuthContext);

  const { loading, error, data } = useQuery<GetPostsRes, GetPostsReq>(
    GET_POSTS,
    {
      variables: {
        categoryID: category.id,
      },
    }
  );

  useLayoutEffect(() => {
    if (
      category.reqPermission.length < 1 &&
      category.writeAbleRole.includes(user.role!)
    )
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity>
            <Feather name="file-plus" size={theme.sizes.base * 1.4} />
          </TouchableOpacity>
        ),
      });
  }, [navigation]);

  if (loading)
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
    <Container safearea={false} padding>
      {data &&
        data.posts.map((d, index) => (
          <TouchableOpacity key={index} onPress={() => handleClick(d.id)}>
            <Card shadow marginTop={index !== 0}>
              <Block>
                <Text bold>{d.title}</Text>
                <Text style={{ marginTop: theme.sizes.base / 6 }}>{`${
                  compareDesc(
                    parseTime(d.createAt),
                    subMonths(new Date(), 1)
                  ) === 1
                    ? format(
                        parseTime(d.createAt),
                        "yyyy년 M월 d일(H시 m분 s초)"
                      )
                    : formatDistanceToNow(parseTime(d.createAt), {
                        locale: ko,
                      }) + " 전"
                } / 작성자: ${d.author.name} ${
                  d.createAt !== d.updateAt ? "(수정됨)" : ""
                }`}</Text>
              </Block>
            </Card>
          </TouchableOpacity>
        ))}
    </Container>
  );
};
