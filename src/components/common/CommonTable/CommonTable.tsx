import { ReactNode, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Shimmer from "../Shimmer/Shimmer";
import styles from "./CommnTable.module.scss";

const CommonTable = ({
  className,
  fields,
  children,
  noRecordFound,
}: {
  className?: string;
  fields?: string[];
  children?: ReactNode;
  noRecordFound?: ReactNode;
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(()=> {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [])
  return (
    <>
      <div className={`${styles.common_table} ${className || ""}`}>
        <Table responsive className={`${styles.table} ${className || ""}`}>
          {fields && (
            <thead>
              <tr>
                {fields?.map((item:any) => (
                  <th key={item}>{item}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {
              loading ?
              <>
              {
                Array.from({length : 4}).map((item, index) => {
                  return (
                    <tr key={index}>
                      {
                        Array.from({length : fields?.length || 1}).map((item, index) => (
                          <td key={index}>
                            <Shimmer height={"18px"} width="100px" />
                          </td>
                        ))
                      }
                    </tr>
                  )
                })
              }
              </>
              :
            children || noRecordFound || (
              <tr className={styles.no_record}>
                <td colSpan={fields?.length}>
                  {noRecordFound || (
                    <div className={styles.no_record_box}>
                      <h4>No Record Found</h4>
                    </div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default CommonTable;
