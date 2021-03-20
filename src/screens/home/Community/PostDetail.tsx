import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Alert, RefreshControl, StyleSheet, View } from "react-native";
import BottomSheet, { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Container } from "../../../components/containers";
import { Block, Text, Input, Loading } from "../../../components/basic";
import { theme } from "../../../constants";
import { ScrollView } from "react-native-gesture-handler";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "react-apollo";
import {
  GetPostDetailReq,
  GetPostDetailRes,
  GET_POST_DETAIL,
} from "../../../graphql/queries";
import { CommunityNavProps } from "../../../navigation/ParamList";
import { parseTime } from "../../../utils/parse";
import { format } from "date-fns";
import { UserRole } from "../../../models/User";
import {
  ADD_COMMENT,
  DELETE_COMMENT,
  LikePostReq,
  LikePostRes,
  LIKE_POST,
  PostCommentAddReq,
  PostCommentAddRes,
  PostCommentDeleteReq,
  PostCommentDeleteRes,
} from "../../../graphql/mutations";
import { Comment, PostStatus } from "../../../models/community";
import Handle from "../../../components/bottomSheet/Handle";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import { AuthContext } from "../../../components/providers/AuthProvider";

type CommentForm = {
  content: string;
};

const CommentFormSchema = Yup.object().shape({
  content: Yup.string()
    .max(100, "최대 100글자까지 입력 가능합니다")
    .required("작성할 댓글을 입력하여 주세요"),
});

export const PostDetailScreen = ({
  route,
  navigation,
}: CommunityNavProps<"Detail">) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const initialValueComment: CommentForm = { content: "" };
  const { user } = useContext(AuthContext);

  const snapPoints = useMemo(() => ["10%", "55%", "90%"], []);

  const handleSheetChanges = useCallback((index: number) => {}, []);
  const [likePost] = useMutation<LikePostRes, LikePostReq>(LIKE_POST);
  const [addComment] = useMutation<PostCommentAddRes, PostCommentAddReq>(
    ADD_COMMENT
  );
  const [deleteCommentMutation] = useMutation<
    PostCommentDeleteRes,
    PostCommentDeleteReq
  >(DELETE_COMMENT);
  const { loading, error, data, refetch } = useQuery<
    GetPostDetailRes,
    GetPostDetailReq
  >(GET_POST_DETAIL, {
    variables: {
      postID: route.params.post,
      commentLimit: 30,
      commentOffset: 0,
    },
    fetchPolicy: "no-cache",
  });
  const [commentData, setCommentData] = useState<Comment[]>([]);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [likeCnt, setLikeCnt] = useState<number>(0);
  const [likeLoading, setLikeLoading] = useState<boolean>(true);
  const [commentLoading, setCommentLoading] = useState<boolean>(false);

  const handleLike = () => {
    if (loading || error || !data) return;
    setLikeLoading(true);
    likePost({
      variables: {
        postID: route.params.post,
        status: !isLike,
      },
    })
      .then((res) => {
        setIsLike((v) => !v);
      })
      .catch((e) => {
        alert("에러가 발생하였습니다");
        setLikeLoading(false);
      });
  };

  const onSubmitComment = (
    values: CommentForm,
    formikHelpers: FormikHelpers<CommentForm>
  ) => {
    addComment({
      variables: {
        anon: false,
        content: values.content,
        postID: route.params.post,
      },
    })
      .then((res) => {
        formikHelpers.resetForm();
        formikHelpers.setTouched({ content: false });
        refetchComment();
      })
      .catch((e) => {
        console.log(e);
        alert("에러");
      });
  };

  const deleteComment = (commentID: string) => {
    Alert.alert("경고", "댓글을 삭제하겠습니까?", [
      {
        text: "취소",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "삭제하기",
        onPress: () => {
          console.log(route.params.post);
          console.log(commentID);
          deleteCommentMutation({
            variables: {
              postID: route.params.post,
              commentID,
            },
          })
            .then((res) => {
              refetchComment();
            })
            .catch((e) => {
              alert("에러");
            });
        },
        style: "destructive",
      },
    ]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Block row center>
          <Text bold style={{ marginRight: 2 }}>
            {likeCnt}
          </Text>
          {likeLoading ? (
            <Loading />
          ) : (
            <TouchableOpacity style={{ padding: 4 }} onPress={handleLike}>
              <Ionicons
                name={isLike ? "heart" : "heart-outline"}
                size={theme.sizes.base * 1.4}
                color={isLike ? theme.colors.accent : theme.colors.black}
              />
            </TouchableOpacity>
          )}
        </Block>
      ),
    });
  }, [navigation, isLike, likeCnt, likeLoading]);

  useEffect(() => {
    if (loading || error || !data) return;
    setIsLike(data.post.isLike!);
    setLikeCnt(data.post.like!);
    setLikeLoading(false);
    setCommentData(data.post.comment!);
  }, [data]);

  useEffect(() => {
    if (loading || error || !data) return;
    let plusLike: number = 0;
    if (data.post.isLike && !isLike) plusLike = -1;
    else if (!data.post.isLike && isLike) plusLike = 1;
    setLikeCnt(data.post.like! + plusLike);
    setLikeLoading(false);
  }, [isLike]);

  const refetchComment = async () => {
    setCommentLoading(true);
    try {
      const res = await refetch({
        postID: route.params.post,
        commentLimit: 30,
        commentOffset: 0,
      });
      setCommentData(res.data.post.comment!);
      setCommentLoading(false);
    } catch (e) {
      alert("에러");
    }
    setCommentLoading(false);
  };

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
      <Container scroll safearea={false} padding>
        <Block
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: theme.colors.gray2,
            paddingVertical: theme.sizes.base / 2,
          }}
        >
          <Text bold h2>
            {data.post.title}
          </Text>
          <Text>{`작성일: ${format(
            parseTime(data.post.createAt),
            "yyyy년 M월 d일(H시 m분 s초)"
          )}`}</Text>
          {data.post.createAt !== data.post.updateAt && (
            <Text>
              {`수정일: " +
              ${format(
                parseTime(data.post.updateAt),
                "yyyy년 M월 d일(H시 m분 s초)"
              )}
            `}
            </Text>
          )}
        </Block>
        <Block
          style={{
            paddingVertical: theme.sizes.base,
          }}
        >
          <Text>{data.post.content}</Text>
        </Block>
      </Container>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        index={1}
        handleComponent={Handle}
        enableHandlePanningGesture
        enableContentPanningGesture
      >
        <Block flex padding={[0, theme.sizes.padding]}>
          <Text bold h1>
            댓글
          </Text>
          <Text style={{ marginTop: theme.sizes.base / 2 }}>
            {data.post.comment!.length > 0
              ? `총 ${data.post.comment!.length}개의 댓글이 있습니다`
              : "작성된 댓글이 없습니다"}
          </Text>
          <Block
            row
            center
            style={{ alignSelf: "stretch", textAlign: "center" }}
          >
            <Formik
              initialValues={initialValueComment}
              onSubmit={onSubmitComment}
              validationSchema={CommentFormSchema}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  <Block flex>
                    <Input
                      placeholder="작성할 내용을 입력하여 주세요"
                      value={values.content}
                      onChangeText={handleChange("content")}
                      onBlur={handleBlur("content")}
                      error={touched.content && errors.content}
                    />
                  </Block>
                  <Block>
                    <TouchableOpacity
                      style={{ padding: theme.sizes.base / 4 }}
                      onPress={() => handleSubmit()}
                    >
                      <Feather name="send" size={theme.sizes.base * 1.2} />
                    </TouchableOpacity>
                  </Block>
                </>
              )}
            </Formik>
          </Block>
          <ScrollView
            contentContainerStyle={{}}
            refreshControl={
              <RefreshControl
                refreshing={commentLoading}
                onRefresh={refetchComment}
              />
            }
          >
            <Block style={{ marginTop: 0, flex: 1 }}>
              {commentData.map((d, index) => (
                <TouchableOpacity
                  key={index}
                  onLongPress={() => deleteComment(d.id)}
                  disabled={
                    d.author.id !== user.id || d.status === PostStatus.Deleted
                  }
                >
                  <Block
                    style={{
                      borderBottomWidth: 0.5,
                      borderBottomColor: theme.colors.gray2,
                      paddingVertical: theme.sizes.base / 2,
                    }}
                  >
                    <Block space={"between"} flex={1} row>
                      <Text bold>
                        {d.author.name}
                        {d.author.role === UserRole.teacher ? "선생님" : ""}
                      </Text>
                      <Text>
                        {format(
                          parseTime(d.createAt),
                          "yyyy년 M월 d일(H시 m분 s초)"
                        )}
                      </Text>
                    </Block>
                    <Text style={{ marginTop: theme.sizes.base / 4 }}>
                      {d.content}
                    </Text>
                  </Block>
                </TouchableOpacity>
              ))}
            </Block>
          </ScrollView>
        </Block>
      </BottomSheet>
    </View>
  );
};
