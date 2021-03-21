import React, { useCallback, useMemo, useState } from "react";
import { View, Image, Alert } from "react-native";
import { Container } from "../../../components/containers";
import { Block, Text, Loading, Card } from "../../../components/basic";
import { theme } from "../../../constants";
import { useQuery } from "react-apollo";
import {
  GetHomepageDetailReq,
  GetHomepageDetailRes,
  GET_HOMEPAGE_DETAIL,
} from "../../../graphql/queries";
import { EtcNavProps } from "../../../navigation/ParamList";
import { parseTime } from "../../../utils/parse";
import { format } from "date-fns";
import ImageView from "react-native-image-viewing";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { HomepageFiles } from "../../../models";
import { openWeb } from "../../../utils/web";

export const BoardDetailScreen = ({ route }: EtcNavProps<"Detail">) => {
  const { loading, error, data } = useQuery<
    GetHomepageDetailRes,
    GetHomepageDetailReq
  >(GET_HOMEPAGE_DETAIL, {
    variables: {
      board: route.params.board,
      id: route.params.id,
    },
  });
  const [imageVisible, setImageVisible] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number>(0);

  const ImageUris = useMemo(() => {
    if (loading || error || !data) return;
    const result = [];
    data.homepageDetail.images.forEach((d) => {
      result.push({ uri: d });
    });
    return result;
  }, [data]);

  const handleClickFile = useCallback(
    (file: HomepageFiles) => {
      Alert.alert("첨부파일", file.name, [
        {
          text: "다운로드",
          style: "destructive",
          onPress: () => openWeb(file.download),
        },
        {
          text: "미리보기",
          style: "default",
          onPress: () => openWeb(file.preview),
        },
        {
          text: "취소",
          style: "cancel",
        },
      ]);
    },
    [data]
  );

  if (loading)
    return (
      <Block flex center middle>
        <Loading />
      </Block>
    );
  if (error || !data)
    return (
      <Block flex center middle>
        <Text>로딩중 에러가 발생하였습니다</Text>
      </Block>
    );

  return (
    <View style={{ flex: 1 }}>
      <ImageView
        images={ImageUris}
        imageIndex={imageIndex}
        visible={imageVisible}
        onImageIndexChange={(d) => setImageIndex(d)}
        onRequestClose={() => setImageVisible(false)}
      />
      <Container scroll safearea={false} padding>
        <Block
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: theme.colors.gray2,
            paddingVertical: theme.sizes.base / 2,
          }}
        >
          <Text bold h2>
            {data.homepageDetail.title}
          </Text>
          <Text>{data.homepageDetail.writtenBy}</Text>
          <Text>{`작성일: ${format(
            parseTime(data.homepageDetail.createAt),
            "yyyy년 M월 d일"
          )}`}</Text>
        </Block>

        <Block
          style={{
            paddingVertical: theme.sizes.base,
          }}
        >
          <Text>
            {data.homepageDetail.content.trim() !== ""
              ? data.homepageDetail.content.trim()
              : "등록된 내용이 없습니다"}
          </Text>
        </Block>
        {data.homepageDetail.images.length > 0 && (
          <Block
            style={{
              borderTopWidth: 0.5,
              borderTopColor: theme.colors.gray2,
              paddingVertical: theme.sizes.base,
            }}
          >
            <FlatList
              data={data.homepageDetail.images}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              renderItem={({ item: uri, index }) => (
                <TouchableOpacity
                  onPress={() => {
                    setImageIndex(index);
                    setImageVisible(true);
                  }}
                >
                  <Block shadow>
                    <Image
                      source={{ uri }}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: theme.sizes.radius,
                      }}
                      key={index}
                    />
                  </Block>
                </TouchableOpacity>
              )}
            />
          </Block>
        )}
        {data.homepageDetail.files.length > 0 && (
          <Block
            style={{
              borderTopWidth: 0.5,
              borderTopColor: theme.colors.gray2,
              paddingVertical: theme.sizes.base,
            }}
          >
            <Block style={{ marginBottom: theme.sizes.base / 2 }}>
              <Text bold>첨부파일</Text>
              <Text caption gray style={{ marginTop: theme.sizes.base / 8 }}>
                클릭하여 다운로드 또는 미리보기
              </Text>
            </Block>
            {data.homepageDetail.files.map((d, index) => (
              <TouchableOpacity onPress={() => handleClickFile(d)} key={index}>
                <Card key={index} shadow>
                  <Text>{d.name}</Text>
                </Card>
              </TouchableOpacity>
            ))}
          </Block>
        )}
      </Container>
    </View>
  );
};
