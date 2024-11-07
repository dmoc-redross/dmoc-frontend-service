import { useEffect, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { TitlteText } from "../../../../common";
import CommonTable from "../../../../common/CommonTable/CommonTable";
import styles from "./LeaderBoard.module.scss";
import trophy from "../../../../../assets/images/cups_img.png";
import { LeaderBoardapi } from "../../../../Services/api.service";
import {
  addresFormate,
  formatNumber,
  usdtValueConvert,
} from "../../../../Services/Helper";
import { EXPLORER_ADDRESS } from "../../../../../utils/constants";

const LeaderBoard = () => {
  const leadertable = ["Sr No", "Wallet Address", "Invested Amount"];
  const [isTxMounted, setIsTxMounted] = useState(false);

  // const [dayData, setDay] = useState<any[]>([]);
  // const [weekData, setWeek] = useState<any[]>([]);
  // const [monthData, setMonth] = useState<any[]>([]);

  // const handleleaderBoard = async () => {
  //   try {
  //     const leaderBoardres = await LeaderBoardapi();
  //     if (leaderBoardres?.status == 200){

  //       setDay(leaderBoardres?.data[0]?.dayDeposits);
  //       setWeek(leaderBoardres?.data[0]?.weekDeposits);
  //       setMonth(leaderBoardres?.data[0]?.monthDeposits);
  //     }
  //   } catch (error) {
  //     console.log(error, "errorInCaseOfHandleleaderBoard");
  //   }
  // };

  const [data, setData] = useState<any>({
    day: [],
    week: [],
    month: [],
  });

  const handleleaderBoard1 = async () => {
    try {
      const leaderBoardres = await LeaderBoardapi();
      if (leaderBoardres && leaderBoardres?.status === 200) {
        setData({
          day: leaderBoardres?.data[0]?.dayDeposits || [],
          week: leaderBoardres?.data[0]?.weekDeposits || [],
          month: leaderBoardres?.data[0]?.monthDeposits || [],
        });
      }
    } catch (error) {
      console.log(error, "errorInCaseOfHandleleaderBoard");
    }
  };

  useEffect(() => {
    let isMounted = true;

    const cleanup = () => {
      isMounted = false;
    };

    if (!isTxMounted) {
      setIsTxMounted(true);
      return cleanup;
    }
    if (isMounted) {
      handleleaderBoard1();
    }
    return cleanup;
  }, [isTxMounted]);

  return (
    <>
      <section className={styles.leader_board}>
        <Container>
          <TitlteText title="Leaderboard" Icon={trophy} />
          <div className={styles.leader_board_inner}>
            <Tabs
              defaultActiveKey="day"
              //transition={false}
              id="noanim-tab-example"
              className={styles.leader_tabs}
            >
              <Tab eventKey="day" title="Day">
                <CommonTable
                  fields={leadertable}
                  className={styles.leader_board_inner_table}
                >
                  {data?.day
                    ? data?.day?.length > 0 &&
                      data?.day?.map((data: any, index: any) => {
                        return (
                          <tr key={index}>
                            {/* <td>{data.sr}</td> */}
                            <td>{index + 1}</td>
                            <td className={styles.wallet_add}>
                              <a
                                className=""
                                href={EXPLORER_ADDRESS + data?._id}
                                target="_blank"
                              >
                                {addresFormate(data?._id)}
                              
                              </a>
                            </td>
                            <td>
                              <p
                                title={
                                  data?.totalAmount ? data?.totalAmount : "0"
                                }
                              >
                                {data?.totalAmount
                                  ? formatNumber(data?.totalAmount)
                                  : "0"}
                              </p>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </CommonTable>
              </Tab>
              <Tab eventKey="week" title="Week">
                <CommonTable
                  fields={leadertable}
                  className={styles.leader_board_inner_table}
                >
                  {data?.week
                    ? data?.week?.length > 0 &&
                      data?.week?.map((data: any, index: any) => {
                        return (
                          <tr key={index}>
                            {/* <td>{data.sr}</td> */}
                            <td>{index + 1}</td>

                            <td className={styles.wallet_add}>
                              <a
                                className=""
                                href={EXPLORER_ADDRESS + data?._id}
                                target="_blank"
                              >
                                {addresFormate(data?._id)}
                              </a>
                            </td>
                            <td>
                              <p
                                title={
                                  data?.totalAmount ? data?.totalAmount : "0"
                                }
                              >
                                {data?.totalAmount
                                  ? formatNumber(data?.totalAmount)
                                  : "0"}
                              </p>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </CommonTable>
              </Tab>
              <Tab eventKey="month" title="Month">
                <CommonTable
                  fields={leadertable}
                  className={styles.leader_board_inner_table}
                >
                  {
                  data?.month
                    ? data?.month?.length > 0 &&
                    data?.month?.map((data: any, index: any) => {
                        return (
                          <tr key={index}>
                            {/* <td>{data.sr}</td> */}
                            <td>{index + 1}</td>

                            <td className={styles.wallet_add}>
                              <a
                                className=""
                                href={EXPLORER_ADDRESS + data?._id}
                                target="_blank"
                              >
                                {addresFormate(data?._id)}
                              </a>
                            </td>
                            <td>
                              <p
                                title={
                                  data?.totalAmount ? data?.totalAmount : "0"
                                }
                              >
                                {formatNumber(data?.totalAmount)}
                              </p>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </CommonTable>
              </Tab>
            </Tabs>
          </div>
        </Container>
      </section>
    </>
  );
};
export default LeaderBoard;
