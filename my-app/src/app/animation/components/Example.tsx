import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/router"; 

export const Example = () => {
  const router = useRouter();

  const handleAnimationComplete = () => {
    // アニメーションが完了したときに移動
    router.push("http://localhost:3000/mezamashitai/my-app/frontend"); // 遷移したいページのパス
  };

  return (
    <motion.div
      className="container"
      initial={{ x: 0 }}
      animate={{ x: 100 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
      onAnimationComplete={handleAnimationComplete} // アニメーション完了時の処理
      style={{
        height: "300px",
        width: "300px",
        backgroundImage: "url('your-image-url')",
        borderRadius: "30px",
      }}
    />
  );
};

