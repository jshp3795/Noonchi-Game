type Props = {
    quantity: number;
    visible: boolean;
}

export default function Coin(props: Props) {
    const animation = props.visible ? "fade 0.3s ease-out reverse" : "fade 0.3s ease-out forwards";

    switch (props.quantity) {
        case 0:
            return <div/>;
        case 1:
            return (
                <div className="h-full">
                    <div className="coin bg-yellow-400 shadow shadow-yellow-600 border border-4 border-yellow-500" style={{ animation }} />
                </div>
            );
        case 2:
            return (
                <div className="h-fit flex" style={{ marginTop: "20%" }}>
                    <div className="coin bg-yellow-400 shadow shadow-yellow-600 border border-4 border-yellow-500" style={{ animation, left: "31%" }} />
                    <div className="coin bg-yellow-400 shadow shadow-yellow-600 border border-4 border-yellow-500" style={{ animation, left: "31%", marginLeft: "-5%" }} />
                </div>
            );
        case 3:
            return (
                <div className="h-fit flex" style={{ marginTop: "20%" }}>
                    <div className="coin bg-yellow-400 shadow shadow-yellow-600 border border-4 border-yellow-500" style={{ animation, left: "25%" }} />
                    <div className="coin bg-yellow-400 shadow shadow-yellow-600 border border-4 border-yellow-500" style={{ animation, left: "25%", marginLeft: "-5%" }} />
                    <div className="coin bg-yellow-400 shadow shadow-yellow-600 border border-4 border-yellow-500" style={{ animation, left: "25%", marginLeft: "-5%" }} />
                </div>
            );
        default:
            return (
                <div className="h-fit flex" style={{ marginTop: "20%" }}>
                    <div className="coin bg-yellow-400 shadow shadow-yellow-600 border border-4 border-yellow-500" style={{ animation, left: "18%" }} />
                    <div className="coin bg-yellow-400 shadow shadow-yellow-600 border border-4 border-yellow-500" style={{ animation, left: "18%", marginLeft: "-5%" }} />
                    <div className="coin bg-yellow-400 shadow shadow-yellow-600 border border-4 border-yellow-500" style={{ animation, left: "18%", marginLeft: "-5%" }} />
                    <div className="coin bg-yellow-400 shadow shadow-yellow-600 border border-4 border-yellow-500" style={{ animation, left: "18%", marginLeft: "-5%" }} />
                </div>
            );
    }
}