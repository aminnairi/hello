import { useCallback, useMemo } from "react";

export const useVibration = () => {
  const vibrationSupported = useMemo(() => {
    return typeof window.navigator.vibrate === "function";
  }, []);

  const regularVibration = useCallback(() => {
    if (vibrationSupported) {
      window.navigator.vibrate(50);
    }
  }, [vibrationSupported]);

  const errorVibration = useCallback(() => {
    if (vibrationSupported) {
      window.navigator.vibrate([200, 100, 200, 100, 200]);
    }
  }, [vibrationSupported]);

  const withRegularVibration = useCallback(<Input, Output>(callback: (...input: Input[]) => Output) => {
    return (...input: Input[]): Output => {
      regularVibration();
      return callback(...input);
    };
  }, [regularVibration]);

  const withErrorVibration = useCallback(<Input, Output>(callback: (...input: Input[]) => Output) => {
    return (...input: Input[]): Output => {
      errorVibration();
      return callback(...input);
    };
  }, [errorVibration]);

  return {
    withRegularVibration,
    withErrorVibration,
    regularVibration,
    errorVibration,
  };
};
