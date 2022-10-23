import { Route } from "@react-navigation/native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useCallback, useContext } from "react";
import { Appbar } from "react-native-paper";
import { DiscardModalContext } from "../context/DiscardModalContext";
import { ScreenParams } from "../types";

type StackHeaderProps = NativeStackHeaderProps & {
  route: Route<string> & { params?: ScreenParams };
};

export const CustomNavigationBar = ({
  back,
  navigation,
  route,
  options,
}: StackHeaderProps) => {
  const { discardModalState, setDiscardModalState } =
    useContext(DiscardModalContext) ?? {};

  const handlePress = () => {
    if (discardModalState?.hasChanges) {
      setDiscardModalState?.({
        show: true,
        action: navigation.goBack,
        hasChanges: true,
      });
    } else {
      navigation.goBack();
    }
  };

  return (
    <Appbar.Header>
      {back && <Appbar.BackAction onPress={handlePress} />}
      <Appbar.Content title={options.title ?? route.params?.title} />
    </Appbar.Header>
  );
};
