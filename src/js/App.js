import { useEffect, useState } from "react";

function App() {
  const [pos, setPos] = useState({ x: 200, y: 200 });
  const [startTime, setStartTime] = useState(0);
  const [message, setMessage] = useState("");

  // 화면에 처음 뜨는 순간 타이머 시작
  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <button
        style={{
          position: "absolute",
          left: pos.x,
          top: pos.y,
        }}
        onMouseEnter={() => {
          // 버튼 위치만 이동 (시간은 안 건드림)
          setTimeout(() => {
            setPos({
              x: Math.random() * 300,
              y: Math.random() * 300,
            });
          }, 80);
        }}
        onClick={() => {
          const seconds = ((Date.now() - startTime) / 1000).toFixed(1);
          setMessage(`당신의 ${seconds}초를 빼앗았습니다 😈`);
        }}
      >
        클릭 해봐~
      </button>

      {message && (
        <div style={{ marginTop: 20 }}>
          <h2>{message}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
