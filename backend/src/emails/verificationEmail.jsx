import React from "react";
import { render } from "@react-email/render";
import { Html, Head, Font, Preview, Heading, Row, Section, Text } from "@react-email/components";

function VerificationEmail({ username, otp }) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
      </Head>
      <Preview>Here&apos;s your verification code: {otp}</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello {username},</Heading>
        </Row>
        <Row>
          <Text>
            Thank you for registering. Please use the following verification
            code to complete your registration:
          </Text>
        </Row>
        <Row>
          <Text>{otp}</Text>
        </Row>
        <Row>
          <Text>
            If you did not request this code, please ignore this email.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}

export async function getVerificationEmailHTML({ username, otp }) {
  return await render(VerificationEmail({ username, otp }));
}

export default VerificationEmail;