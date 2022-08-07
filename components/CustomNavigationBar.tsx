import { Route } from "@react-navigation/native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Appbar } from "react-native-paper";
import { ScreenParams } from "../types";

type StackHeaderProps = NativeStackHeaderProps & {
  route: Route<string> & { params?: ScreenParams };
};

export const CustomNavigationBar = ({
  back,
  navigation,
  route,
}: StackHeaderProps) => {
  const title = route.params?.title ?? route.name;
  return (
    <Appbar.Header>
      {back && <Appbar.BackAction onPress={navigation.goBack} />}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};
