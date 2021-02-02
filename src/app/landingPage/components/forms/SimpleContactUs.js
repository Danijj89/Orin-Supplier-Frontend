import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import {ReactComponent as SvgDotPatternIcon} from "../../images/dot-pattern.svg";
import LandingPageService from "features/api/LandingPageService.js";
const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-500 text-gray-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }
`;

const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;

const SvgDotPattern1 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`

export default () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nameInput, emailInput, phonewechatInput, companyInput } = e.target.elements;
    let contact = {
      name: nameInput.value,
      email: emailInput.value,
      phonewechat: phonewechatInput.value,
      company: companyInput.value,
    };

  
    let result = await LandingPageService.sendContactInfo(contact);
    if (result.status === 200) {
        alert("我们收到了您的信息、我们会尽快联系您！");
    } else {
        alert("好像有问题、请联系我们的客户主管： Mirko mirko@orintrade.com, 微信/电话: 15217951858");
    }
  };
  return (
    <Container>
      <Content>
        <FormContainer>
          <div tw="mx-auto max-w-4xl">
            <a href="#contact-form" id="contact-form"><h2>获取3个月免费试用</h2></a>
            <form onSubmit={handleSubmit}>
              <TwoColumn>
                <Column>
                  <InputContainer>
                    <Label htmlFor="name-input">姓名*</Label>
                    <Input id="nameInput" type="text" name="name" placeholder="例如： 刘意如" />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="email-input">邮件*</Label>
                    <Input required id="emailInput" type="email" name="email" placeholder="例如： 29080990@qq.com" />
                  </InputContainer>
                </Column>
                <Column>
                  <InputContainer>
                    <Label htmlFor="phonewechat-input">电话/微信</Label>
                    <Input id="phonewechatInput" type="text" name="name" placeholder="例如： 15217951888" />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="company-input">公司</Label>
                    <Input id="companyInput" type="text" name="email" placeholder="例如： 深圳美一天科技有限公司" />
                  </InputContainer>
                </Column>
              </TwoColumn>

              <SubmitButton type="submit" value="Submit">发送</SubmitButton>
            </form>
          </div>
          <SvgDotPattern1 />
        </FormContainer>
      </Content>
    </Container>
  );
};
