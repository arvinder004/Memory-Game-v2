import './App.css'

import { useEffect, useState } from "react"

export default function MemoryGame() {

    const [gridSize, setGridSize] = useState(4);
    const [cards, setCard] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [solved, setSolved] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [won, setWon] = useState(false);

    const handleGridSizeChange = (e) => {
        const size = parseInt(e.target.value);
        if (size >= 2 && size <= 10) setGridSize(size);
    };

    const initializeGame = () => {
        const totalCards = gridSize * gridSize;
        const pairCount = Math.floor(totalCards / 2);
        const numbers = [...Array(pairCount).keys()].map((n) => n + 1);
        const shuffledCard = [...numbers, ...numbers]
            .sort(() => Math.random() - 0.5)
            .map((number, index) => ({ id: index, number }));
        // console.log(shuffledCard)
        setCard(shuffledCard)
        setFlipped([]);
        setSolved([]);
        setWon(false);
    };

    useEffect(() => {
        initializeGame();
    }, [gridSize]);

    const checkMatch = (secondId) => {
        const [firstId] = flipped;
        if (cards[firstId].number === cards[secondId].number) {
            setSolved([...solved, firstId, secondId]);
            setFlipped([])
            setDisabled(false)
        } else {
            setTimeout(() => {
                setFlipped([]);
                setDisabled(false);
            }, 1000);
        }
    }

    const handleClick = (id) => {
        if (disabled || won) return;

        if (flipped.length === 0) {
            setFlipped([id]);
            return;
        }

        if (flipped.length === 1) {
            setDisabled(true)
            if (id !== flipped[0]) {
                setFlipped([...flipped, id]);
                checkMatch(id);
            } else {
                setFlipped([])
                setDisabled(false)
            }
        }
    };

    const isFlipped = (id) => flipped.includes(id) || solved.includes(id);

    const isSolved = (id) => solved.includes(id);

    useEffect(() => {
        if (solved.length === cards.length && cards.length > 0) {
            setWon(true)
        }
    }, [solved, cards])

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-grey-100 p-4">
                <h1 className="text-3xl font-bold mb-6 bg-gray-300 p-3 rounded">Test Your Memory</h1>

                {/* input */}
                <div className="mb-4  bg-orange-200 rounded">
                    {/* <label htmlFor="gridSize" className="mr-2">Grid Size : (max 10)</label>
                    <input type="number" name="" id="gridSize" min={"2"} max={"10"} value={gridSize} onChange={handleGridSizeChange} className="border-2 border-gray-300 px-2 py-1" /> */}
                    <button
                        className="m-4 p-4 bg-red-500 text-white border border-white rounded hover:bg-red-400 transition-colors "
                        onClick={()=>{setGridSize(2)}}
                    >
                        2 x 2
                    </button>
                    <button
                        className="m-4 p-4 bg-red-500 text-white border border-white rounded hover:bg-red-400 transition-colors"
                        onClick={()=>{setGridSize(4)}}
                    >
                        4 x 4
                    </button>
                    <button
                        className="m-4 p-4 bg-red-500 text-white border border-white rounded hover:bg-red-400 transition-colors"
                        onClick={()=>{setGridSize(6)}}
                    >
                        6 x 6
                    </button>
                    <button
                        className="m-4 p-4 bg-red-500 text-white border border-white rounded hover:bg-red-400 transition-colors"
                        onClick={()=>{setGridSize(8)}}
                    >
                        8 x 8
                    </button>
                    {/* <button
                        className="m-4 p-4 bg-red-500 text-white rounded hover:bg-red-400 transition-colors"
                        onClick={()=>{setGridSize(10)}}
                    >
                        10 x 10
                    </button> */}


                </div>

                {/* Game Board */}
                <div
                    className={`grid gap-2 mb-4 p-4 bg-orange-100 rounded`}
                    style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0,1fr))`, width: `min(100%, ${gridSize * 5.5}rem)`, }}
                >
                    {cards.map((card) => {
                        return (
                            <div
                                key={card.id}
                                onClick={() => handleClick(card.id)} className={`aspect-square flex items-center justify-center border border-black text-xl font-bold rounded-lg cursor-pointer transition-all duration-300 ${isFlipped(card.id)
                                        ? isSolved(card.id)
                                            ? "bg-green-500 text-white"
                                            : "bg-blue-500 text-white"
                                        : "bg-gray-300 text-gray-400"
                                    }`}
                            >
                                {isFlipped(card.id) ? card.number : "?"}
                            </div>
                        )
                    })}
                </div>

                {/* result */}
                {true && <div className="mt-4 text-4xl font-bold text-green-500 bg-white animate-bounce rounded p-1">You Won!</div>}

                {/* reset and play button */}
                <button onClick={initializeGame} className="mt-4 px-4 py-2 bg-orange-200 text-black rounded hover:bg-green-600 transition-colors">
                    {won ? "Play Again" : "Reset"}
                </button>
            </div>
        </>
    )
}