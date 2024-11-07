// import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { TitlteText } from "../../../../common";
import styles from "./Faq.module.scss";
import { Container } from "react-bootstrap";

const faqData = [
  {
    eventKey: "0",
    title: "How does the Sky Marvel affiliate marketing program work?",
    content: [
      "Join the platform by purchasing a membership that starts from as low as USD 10.",
      "Refer the platform to unemployed people.",
      "Earn rewards as new participants join the platform and become a part of your downline."
    ],
  },
  {
    eventKey: "1",
    title: "How does the referral program work?",
    content:
      "Upon registering for the Sky Marvel affiliate marketing program and acquiring a membership, participants receive unique referral links. They can then utilize these referral links to promote the platform within their network of friends, family, and online contacts. When a new individual registers through the participant's referral link, the participant earns referral commissions, paid out in Sky Marvel tokens and USDT.",
  },
  {
    eventKey: "2",
    title: "Can the company change the incentive structure?",
    content:
      "Yes, the company has the authority to make adjustments to the incentive. However, any modifications will be implemented with the best interests of both the company and the participants in mind. Additionally, participants will receive prompt notification of any changes made to the incentive structure.",
  },
  {
    eventKey: "3",
    title: "How can I ensure trust and transparency in the system?",
    content:
      "The Sky Marvel affiliate marketing program is backed by the blockchain technology, and all of the incentives are given out using the platform’s BEP-20 Sky Marvel crypto token. Since crypto transactions are recorded on the blockchain, accessible to everyone on the network, it brings transparency to the process and fosters users’ trust in the system.",
  },
];

const Faq = () => {
  //   const [activeKey, setActiveKey] = useState("0");

  //   const handleAccordionChange = (key: any) => {
  //     setActiveKey(key);
  //   };
  return (
    <section className={styles.faq}>
      <Container>
        <TitlteText title="Frequently Asked Questions" />
        <Accordion
          // activeKey={activeKey}
          // onSelect={handleAccordionChange}
          defaultActiveKey="0"
        >
          {faqData.map((item, index) => (
            <Accordion.Item
              key={index}
              eventKey={item.eventKey}
            // className={activeKey === <>{item.eventKey} </> ? "active" : {}}
            >
              <Accordion.Header>{item.title}</Accordion.Header>
              <Accordion.Body>{
                Array.isArray(item.content) ?
                <ul style={{listStyle: "disc", paddingLeft: "2rem"}}>
                {
                  item.content.map(item => {
                    return (
                      <li>
                        {item}
                      </li>
                    )
                  })
                }
                </ul>
                :
                item.content
                }</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </section>
  );
};

export default Faq;
