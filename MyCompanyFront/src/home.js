import "./home.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Home = () => {
  return (
    <div className="big-bg" id="home">
      <div className="home-content wrapper">
        <h2 className="page-title">My Company</h2>
        <p>
          23卒向け超高機能企業メモアプリケーション(ただの練習用ReactToDoアプリ)
        </p>
        <p>
          NetlifyにReact,HerokuにRailsをAPIサーバーとして置いています
        </p>
        <p>※herokuがスリープ状態の場合リストの取得、更新に時間がかかる場合があります</p>
        <p>認証周りはAuth0を使用してみたんですけど思ったより面倒臭いですね</p>
        <Button variant="info" size="lg">
          <Link to={"/todos"} style={{ color: "white" }}>
            早速メモする
          </Link>
        </Button>
        <br />
      </div>
    </div>
  );
};

export default Home;
