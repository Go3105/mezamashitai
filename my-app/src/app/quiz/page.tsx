import ShowQuiz from "./QuizButton";

interface QuizOption {
    question: string;
    choice: string;
    is_correct: boolean;
}

interface QuizData {
    options: QuizOption[];
}

export default async function Quiz() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/today_quiz');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data_json: QuizData = await response.json();
        console.log(data_json)

        return (
            <div>
                <p className={`text-2xl font-semibold text-gray-800`}>
                    {data_json.options[0].question}
                </p>
                {data_json.options.map((option: QuizOption, index: number) => (
                    <ShowQuiz
                        key={index}
                        choice={option.choice}
                        is_correct={option.is_correct}
                    />
                ))}
            </div>
        );
    } catch (error) {
        console.error("Failed to fetch quiz data:", error);
        return <div>Error fetching quiz data</div>;
    }
}