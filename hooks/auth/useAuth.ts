import { db } from "@/lib/db";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

export const useSignIn = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      db.signInWithPassword(data),
    onSuccess: () => {
      router.navigate("/");
    },
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) => db.signUp(data),
    onSuccess: () => {
      router.navigate("/");
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => db.logout(),
  });
};
