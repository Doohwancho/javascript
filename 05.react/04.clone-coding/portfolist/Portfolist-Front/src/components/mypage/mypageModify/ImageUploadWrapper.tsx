import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ProfileImage } from "../../../hook/profileImg";
import { ToastError, ToastSuccess } from "../../../hook/toastHook";
import { deleteProfileImage } from "../../../util/api/mainpage/image";
import { postProfileImage } from "../../../util/api/mypage/image";
import { ProfileImageWrapper } from "../../../util/css/mypage/mypage/mypageModify/style";

const ImageUploadWrapper = ({ user }: any) => {
  const queryClient = useQueryClient();

  const [previewURL, setPreviewURL] = useState<any>("");
  const [isCustomImage, setIsCustomImage] = useState<boolean>(false);

  //TODO - Q. react-query에서, diff useQuery() useMutation()?
  /*
  1. useQuery는 데이터를 "읽는" 작업에 사용됩니다. 
    데이터를 가져와 캐시하고, 이후에는 캐시된 데이터를 재사용합니다. 또한, useQuery는 데이터를 자동으로 새로 고침하거나, 백그라운드에서 업데이트하는 등의 기능을 내장하고 있습니다.

  2. useMutation은 데이터를 "변경하는" 작업에 사용됩니다. 
    이는 POST, PUT, DELETE 등의 요청에 주로 사용되며, 이러한 요청은 서버에 있는 데이터를 변경하는 역할을 합니다. 
    useMutation은 성공, 실패, 에러 처리 등의 상태를 관리하는데 도움을 주며, 또한 리트라이(retry)나 쿼리 무효화(query invalidation) 등의 기능을 제공합니다.
  */
  const { mutate: deleteImageHandle } = useMutation(
    () => deleteProfileImage(),
    {
      onSuccess: () => {
        setIsCustomImage(false);
        
        queryClient.invalidateQueries("user");
        /* TODO - library: what is queryClient.invalidateQueries() ?

        goal: for easy synchronization of server state with local cache after a mutation occurs

        step by step
        1. The user uploads or deletes an image, and the mutation is successful (onSuccess callback is triggered).
        2. queryClient.invalidateQueries('user') is then called. This tells React Query that the 'user' data might be outdated.
        3. If there are any active useQuery('user', fetchFunction) hooks in the component tree, they will automatically refetch their data from the server to ensure the local cached data is up-to-date.

        */
        ToastSuccess("프로필 이미지가 삭제되었습니다.");
      },
      onError: () => {
        ToastError("프로필 이미지 삭제를 실패했습니다.");
      },
    }
  );

  const { mutate: postImageHandle } = useMutation(
    (file: File) => postProfileImage(file),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
        ToastSuccess("프로필 이미지가 업데이트 되었습니다.");
      },
      onError: () => {
        ToastError("프로필 이미지가 업데이트를 실패했습니다.");
      },
    }
  );

  const handleFileOnChange = (e: any) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setPreviewURL(reader.result);
      setIsCustomImage(true);
    };

    postImageHandle(file);
    reader.readAsDataURL(file);
  };

  return (
    <ProfileImageWrapper>
      <img
        className="profileImg"
        alt=""
        src={!isCustomImage ? ProfileImage(user?.profile_img) : `${previewURL}`}
      />

      {!user?.github_user ? (
        <>
          <input
            type="file"
            accept="image/jpg,impge/png,image/jpeg,image/gif"
            onChange={handleFileOnChange}
            style={{ display: "none" }}
            id="input-file"
          />
          <label htmlFor="input-file">이미지 업로드</label>
          <div onClick={() => deleteImageHandle()}>기본 이미지 변경</div>
        </>
      ) : null}
    </ProfileImageWrapper>
  );
};

export default ImageUploadWrapper;
