import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useDispatch } from 'react-redux';
//eslint-disable-next-line
import { css } from "styled-components/macro";
import { sendContactInfo } from 'app/landingPage/duck/thunks.js';
import Header from "../headers/light.js";
import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-1.svg";
import DesignIllustration from "../../../../images/export.svg";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;

const Heading = tw.h1`font-bold text-4xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-900 leading-tight`;
const Paragraph = tw.p`my-5 lg:my-8 text-base xl:text-lg`;

const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;

const IllustrationContainer = tw.div`flex justify-center lg:justify-end items-center`;

// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;

// const CustomersLogoStrip = styled.div`
//   ${tw`mt-12 lg:mt-20`}
//   p {
//     ${tw`uppercase text-sm lg:text-xs tracking-wider font-bold text-gray-500`}
//   }
//   img {
//     ${tw`mt-4 w-full lg:pr-16 xl:pr-32 opacity-50`}
//   }
// `;

export default ({ roundedHeaderButton }) => {
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { emailInputOnly} = e.target.elements;
    let contact = {
      email: emailInputOnly.value,
    };

  
    let result = await dispatch(sendContactInfo({contact}));
    if (result.payload.status === 200) {
        alert("我们收到了您的信息、我们会尽快联系您！");
    } else {
        alert("好像有问题、请联系我们的客户主管： Mirko mirko@orintrade.com, 微信/电话: 15217951858");
    }
  };
  return (
    <>
      <Header roundedHeaderButton={roundedHeaderButton} />
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>
              外贸出口从未如此 <span tw="text-primary-500">轻松。</span>
            </Heading>
            <Paragraph>
              一站式服务帮助进出口商全方位解决所有外贸业务，包括客户管理、文件生成、运输管理等。欧领专注于提供专业的用户体验来为您赢取更多商机。
            </Paragraph>
            <Actions>
              <form onSubmit={handleSubmit}>
              <input id="emailInputOnly" type="email" placeholder="您的邮件" />
              <button type="submit" value="submit">免费测试</button>
              </form>
            </Actions>
            {/* <CustomersLogoStrip>
              <p>Our TRUSTED Customers</p>
              <img src={CustomersLogoStripImage} alt="Our Customers" />
            </CustomersLogoStrip> */}
          </LeftColumn>
          <RightColumn>
            <IllustrationContainer>
              <img tw="min-w-0 w-full max-w-lg xl:max-w-3xl" src={DesignIllustration} alt="Design Illustration" />
            </IllustrationContainer>
          </RightColumn>
        </TwoColumn>
        <DecoratorBlob1 />
      </Container>
    </>
  );
};
