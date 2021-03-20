import React, { useContext } from "react";
import { View, Touchable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Container } from "../../../components/containers";
import { AuthContext } from "../../../components/providers/AuthProvider";

import { Block, Card, Loading, Text } from "../../../components/basic";
import { Feather } from "@expo/vector-icons";
import { theme } from "../../../constants";
import { GetCategoriesRes, GET_CATEGORIES } from "../../../graphql/queries";
import { useQuery } from "react-apollo";
import { CommunityNavProps } from "../../../navigation/ParamList";

export const CommunityScreen: React.FC<CommunityNavProps<"Community">> = ({
  navigation,
}) => {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery<GetCategoriesRes, {}>(
    GET_CATEGORIES,
    {
      fetchPolicy: "no-cache",
    }
  );
  if (loading)
    return (
      <Card shadow>
        <Block flex center centerV>
          <Loading />
        </Block>
      </Card>
    );
  if (error)
    return (
      <Card shadow>
        <Block flex={false}>
          <Text>로딩중 에러가 발생하였습니다</Text>
        </Block>
      </Card>
    );
  if (data && data.categories.length < 1)
    return (
      <Card shadow>
        <Block flex={false}>
          <Text body>데이터가 존재하지 않습니다</Text>
        </Block>
      </Card>
    );

  const onPress = (category: string) => {
    const item = data?.categories.find((d) => d.id === category);
    if (!item) return;
    navigation.navigate("List", {
      category: item,
    });
  };

  const BuildCard = ({ title, caption, id, ...otherProps }: any) => (
    <TouchableOpacity onPress={() => onPress(id)}>
      <Card shadow {...otherProps} row space="between" center>
        <Block>
          <Text title>{title}</Text>
          <Text caption color="gray">
            {caption}
          </Text>
        </Block>
        <Feather name="chevron-right" size={theme.sizes.base * 1.5} />
      </Card>
    </TouchableOpacity>
  );

  const BuildDivLine = () => (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.gray2,
        marginBottom: theme.sizes.base,
      }}
    />
  );

  return (
    <Container title="커뮤니티" scroll padding>
      {data?.categories.map((d) => {
        if (d.readAbleRole.indexOf(user.role!) !== -1) {
          return (
            <BuildCard
              id={d.id}
              key={d.id}
              title={d.name}
              caption={d.description}
              marginBottom
            />
          );
        }
      })}
    </Container>
  );
};
