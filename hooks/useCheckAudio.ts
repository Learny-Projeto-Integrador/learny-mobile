import { useApi } from "./useApi";

export const useCheckAudio = () => {
  const { request } = useApi();

  const checkAudio = async () => {
    const result = await request({
      endpoint: "/criancas",
    });

    if (result) {
      return result.audio
    }
  };

  return { checkAudio };
};
