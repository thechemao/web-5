"use client"
import Card from "@/components/about/card";
import { motion, AnimatePresence} from "framer-motion";
import { wrap } from "popmotion";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useState } from "react";
import { duration } from "@mui/material";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? -1000 : 2000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? -1000 : 2000,
      opacity: 0
    };
  }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const cards = [ { id: 0 }, { id: 1 }, { id: 2 } ];

export default function About() {
  const [[page, direction], setPage] = useState([0 , null]);
  const cardsIndex = wrap(0, cards.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  console.log(page, direction);
  return (
    <AnimatePresence initial={false} custom={direction}>
      <motion.main
        key={page}
        className="flex flex-col justify-center w-full h-full flex-1 lg:px-20 md:px-10 px-4 text-center pt-4"
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30},
          opacity: { duration: 0.2 }
        }}
        // drag="x"
        // dragConstraints={{ left: 0, right: 0 }}
        // dragElastic={1}
        // onDragEnd={(e, { offset, velocity }) => {
        //   const swipe = swipePower(offset.x, velocity.x);

        //   if (swipe < -swipeConfidenceThreshold) {
        //     paginate(1);
        //   } else if (swipe > swipeConfidenceThreshold) {
        //     paginate(-1);
        //   }
        // }}
      >

        <Card page={cards[cardsIndex].id}/>


        <div className="bg-gray-950 shadow-md rounded-b-lg flex flex-row justify-between shadow-sky-100">
          <button
            className="
            bg-gray-800 border-2 rounded-bl-lg border-t-0 border-r-[1px] border-sky-500 text-sky-500 px-4 py-2 w-full transition transform
            hover:bg-sky-500 hover:text-gray-800 hover:shadow-[0_0_10px_#06b6d4,0_0_20px_#06b6d4] z-0 hover:z-10
            "
            onClick={() => paginate(-1)}
          >
            <NavigateBeforeIcon/>
          </button>
          <button
            className="
            bg-gray-800 border-2 rounded-br-lg border-t-0 border-l-[1px] border-sky-500 text-sky-500 px-4 py-2 w-full transition transform
            hover:bg-sky-500 hover:text-gray-800 hover:shadow-[0_0_10px_#06b6d4,0_0_20px_#06b6d4] z-0 hover:z-10
            "
            onClick={() => paginate(1)}
          >
            <NavigateNextIcon/>
          </button>
        </div>
      </motion.main>
    </AnimatePresence>
  )
}