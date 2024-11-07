import { useCallback, useState } from "react";
import CustomModal from "../CustomModal";
import Button from "../../Button/Button";
import { useDispatch } from "react-redux";
import { REF_LINK_REGEX } from "../../../../utils/constants";
import { getCheckUser } from "../../../Services/api.service";
import { setLinkId, setRefDone, setReferLink, setReferrerData } from "../../../../redux/features/reducers/user.slice";

const ReferralModal = ({ show, handleClose }: { show: boolean; handleClose: () => void }) => {
  const [refLink, setRefLink] = useState("");
  const [refError, setRefError] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleSubmit = useCallback(async () => {
    if (!refLink) return;

    const id = refLink.split("/").pop();
    const checkUserRes = await getCheckUser({ docIdReferrer: id });

    if (checkUserRes?.status === 200) {
      dispatch(setRefDone(true));
      dispatch(setLinkId(checkUserRes.data._id));
      dispatch(setReferLink(checkUserRes.data.referralLink));
      dispatch(setReferrerData(checkUserRes.data));
      setRefError(false);
      handleClose();
    } else {
      dispatch(setRefDone(false));
      setRefLink("");
      setRefError(true);
    }
  }, [refLink, dispatch, handleClose]);

  const handleRefChange = useCallback((link: string) => {
    setRefLink(link);
    if (link === "") setRefError(false);
    else if (!REF_LINK_REGEX.test(link)) setRefError(true);
    else setRefError(false);
  }, []);

  return (
    <>
      <CustomModal
        show={show}
        onHide={handleClose}
        title="Referral Link"
        backdrop="static"
        keyboard={false}
      >
        <div className="refferal_input">
          <input
            type="text"
            placeholder="Enter referral link"
            value={refLink}
            onChange={(e: any) => handleRefChange(e.target.value)}
            maxLength={100}
          />

          {refError && <p className="red fw-bold ms-3"> Invalid referral link </p>}
          <div className="proceed_btn">
            <Button
              type="submit"
              fluid
              className="mt-4 w-50"
              onClick={() => handleSubmit()}
              disabled={!refLink || refError}
            >
              Proceed
            </Button>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default ReferralModal;
