import React from "react";
import styled from "styled-components";
import Navbar from "../navbar/Navbar";
import Container from "@component/Container";
import AppLayout from "@component/layout/AppLayout";

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const SkeletonRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background: linear-gradient(to right, #eee 20%, #ddd 40%, #eee 60%);
  background-size: 200px 100%;
`;

const SkeletonBlock = styled.div`
  width: ${(props: { width: string }) => (props.width ? props.width : "100%")};
  height: ${(props: { width: string; height?: string }) =>
    props.height ? props.height : "20px"};
  margin-right: 10px;
  border-radius: 4px;
  background-color: #ddd;
`;

const LoadingSkeleton = () => {
  return (
    <AppLayout navbar={<Navbar />}>
      <Container my="2rem">
        <SkeletonWrapper>
          <SkeletonRow>
            <SkeletonBlock width="40%" />
            <SkeletonBlock width="60%" />
          </SkeletonRow>
          <SkeletonRow>
            <SkeletonBlock width="30%" />
            <SkeletonBlock width="70%" />
          </SkeletonRow>
          <SkeletonRow>
            <SkeletonBlock width="20%" />
            <SkeletonBlock width="50%" />
            <SkeletonBlock width="30%" />
          </SkeletonRow>
        </SkeletonWrapper>
      </Container>
    </AppLayout>
  );
};

  

export default LoadingSkeleton;
