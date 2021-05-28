import { FunctionComponent } from "react";

interface ColorSelectorProps {
    customOnClick: (color: string) => void;
    initColor: string;
}

const ColorSelector: FunctionComponent<ColorSelectorProps> = ({
    customOnClick,
    initColor,
}) => {
    const HandleOnSelectorClick: React.MouseEventHandler<HTMLDivElement> = (
        ev
    ) => {
        const target: HTMLElement = ev.target as HTMLElement;
        if (!target.classList.contains("color-box")) {
            return;
        }

        if (!target.parentElement) {
            throw new Error("no parent ?");
        }

        for (const colorBox of Array.from(target.parentElement.children)) {
            colorBox.classList.remove("color-selected");
        }

        target.classList.add("color-selected");
        customOnClick(target.classList[1]);
    };

    return (
        <div onClick={HandleOnSelectorClick} className="color-selector">
            <div
                className={`color-box red color-red ${
                    initColor === "red" && "color-selected"
                } `}
            ></div>
            <div
                className={`color-box blue color-blue ${
                    initColor === "blue" && "color-selected"
                } `}
            ></div>
            <div
                className={`color-box orange color-orange ${
                    initColor === "orange" && "color-selected"
                } `}
            ></div>
            <div
                className={`color-box green color-green ${
                    initColor === "green" && "color-selected"
                } `}
            ></div>
            <div
                className={`color-box pink color-pink ${
                    initColor === "pink" && "color-selected"
                } `}
            ></div>
        </div>
    );
};

export default ColorSelector;
