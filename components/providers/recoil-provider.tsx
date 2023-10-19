"use client"
import { RecoilRoot } from "recoil";

const RecoilProvider = ({ children }:any) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilProvider;
