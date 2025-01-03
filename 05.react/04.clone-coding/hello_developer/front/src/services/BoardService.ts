import { CreateBoardDto, UpdateBoardDto } from "../types/board";
import { api } from "../utils/Common";
import { token } from "./AuthService";

export const getBoards = async (mainCategory: string, subCategory: string) => {
  try {
    return await api.get(`/boards?category1=${mainCategory}&category2=${subCategory}`); //TODO - 카테고리 검색할 떄, 카테고리가 여러개인 경우, api 처리를 이런식으로 했구나 
  } catch (err: any) {
    throw err;
  }
};

export const createBoard = async (accessToken: string, createBoardDto: CreateBoardDto) => {
  try {
    return await api.post(
      "/boards",
      { ...createBoardDto },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (err: any) {
    if (err.response.status === 401) {
      const tokenRes = await token();
      const res = await api.post(
        "/boards",
        { ...createBoardDto },
        {
          headers: {
            Authorization: `Bearer ${tokenRes.data.accessToken}`,
          },
        }
      );
      res.data.accessToken = tokenRes.data.accessToken;
      return res;
    }

    throw err;
  }
};

export const getBoard = async (boardId: string) => {
  try {
    return await api.get(`/boards/${boardId}`);
  } catch (err: any) {
    throw err;
  }
};

export const updateBoard = async (boardId: string, updateBoardDto: UpdateBoardDto, accessToken: string) => {
  try {
    return await api.patch(
      `/boards/${boardId}`,
      { ...updateBoardDto },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (err: any) {
    if (err.response.status === 401) {
      const tokenRes = await token();
      const res = await api.post(
        "/boards",
        { ...updateBoardDto },
        {
          headers: {
            Authorization: `Bearer ${tokenRes.data.accessToken}`,
          },
        }
      );
      res.data.accessToken = tokenRes.data.accessToken;
      return res;
    }

    throw err;
  }
};

export const removeBoard = async (boardId: string, accessToken: string) => {
  try {
    return await api.delete(`/boards/${boardId}`, { headers: { Authorization: `Bearer ${accessToken}` } });
  } catch (err: any) {
    if (err.response.status === 401) {
      const tokenRes = await token();
      const res = await api.delete(`/boards/${boardId}`, {
        headers: { Authorization: `Bearer ${tokenRes.data.accessToken}` },
      });
      res.data.accessToken = tokenRes.data.accessToken;
      return res;
    }

    throw err;
  }
};

export const addRecommend = async (boardId: string, accessToken: string) => {
  try {
    return await api.get(`/boards/${boardId}/recommend`, { headers: { Authorization: `Bearer ${accessToken}` } });
  } catch (err: any) {
    if (err.response.status === 401) {
      const tokenRes = await token();
      const res = await api.get(`/boards/${boardId}/recommend`, {
        headers: { Authorization: `Bearer ${tokenRes.data.accessToken}` },
      });
      res.data.accessToken = tokenRes.data.accessToken;
      return res;
    }

    throw err;
  }
};

export const addViews = async (boardId: string) => {
  try {
    return await api.get(`/boards/${boardId}/views`);
  } catch (err: any) {
    throw err;
  }
};

export const uploadBoardImage = async (formData: FormData, accessToken: string) => {
  try {
    return await api.post(`/boards/image`, formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (err: any) {
    if (err.response.status === 401) {
      const tokenRes = await token();
      const res = await api.post(`/boards/image`, formData, {
        headers: { Authorization: `Bearer ${tokenRes.data.accessToken}` },
      });
      res.data.accessToken = tokenRes.data.accessToken;
      return res;
    }

    throw err;
  }
};

export const getRecentBoards = async () => {
  try {
    return await api.get("/boards/recent");
  } catch (err) {
    // TODO: DNS 에러 발생시 서버측에 최근게시글 데이터 재요청
    try {
      return await api.get("/boards/recent");
    } catch (retryErr) {
      console.error(retryErr);
      throw retryErr;
    }
  }
};

export const searchBoards = async (text: string) => {
  try {
    return await api.get(`/boards/search?text=${text}`);
  } catch (err: any) {
    throw err;
  }
};
