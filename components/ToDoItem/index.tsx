import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput } from "react-native";
import Checkbox from "../Checkbox";

interface TodoItemProps {
  todo: {
    id: string;
    content: string;
    isCompleted: boolean;
  };
  onSubmit: () => void;
}

const TodoItem = ({ todo, onSubmit }: TodoItemProps) => {
  const [isChekced, setIsChecked] = useState(false);
  const [content, setContent] = useState("");

  const input = useRef(null);

  useEffect(() => {
    if (!todo) {
      return;
    }

    setIsChecked(todo.isCompleted);
    setContent(todo.content.toUpperCase());
  }, [todo]);

  useEffect(() => {
    if (input.current) {
      input.current?.focus();
    }
  }, [input]);

  const onKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === "Backspace" && content === "") {
      //Delete Item
      console.warn("Delete Item")
    }
  };

  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 3 }}
    >
      <Checkbox
        isChecked={isChekced}
        onPress={() => {
          setIsChecked(!isChekced);
        }}
      />

      <TextInput
        ref={input}
        value={content}
        onChangeText={setContent}
        style={{
          flex: 1,
          fontSize: 18,
          color: "black",
          marginLeft: 12,
        }}
        multiline
        onSubmitEditing={onSubmit}
        blurOnSubmit
        onKeyPress={onKeyPress}
      />
    </View>
  );
};

export default TodoItem;
