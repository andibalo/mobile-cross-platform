import { View, Button } from "react-native";

interface ICounter {
    handleDecrement: () => void
    handleIncrement: () => void
    value: number
}

const Counter = ({ handleIncrement, handleDecrement, value }: ICounter) => {
    return (
        <View>
            {value}
            <Button title="Increment" onPress={handleIncrement} />
            <Button title="Decrement" onPress={handleDecrement} />
        </View>
    );
};


export default Counter