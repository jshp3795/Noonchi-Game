type Props = {
    visible: boolean;
    children?: any;
}

export default function Coin(props: Props) {
    if (props.visible)
        return (
            <div className="iceberg relative shadow-2xl">
                { props.children }
            </div>
        );
    else
        return <div className="iceberg relative" />
}