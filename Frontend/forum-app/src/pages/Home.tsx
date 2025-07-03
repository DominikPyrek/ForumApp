import HomeWrapper from "@/components/Home/HomeWrapper";
import MainHome from "@/components/Home/MainHome";
import HomeHeader from "@/components/Home/HomeHeader";

export default function Home() {
  return (
    <HomeWrapper>
      <HomeHeader></HomeHeader>
      <MainHome></MainHome>
    </HomeWrapper>
  );
}
