import { useWindowSize } from 'react-use';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { Container, VStack, HStack, Input, Button, Checkbox, Text } from "@chakra-ui/react";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [confetti, setConfetti] = useState(false);
  const [confettiDuration, setConfettiDuration] = useState(10000); // 10 seconds
  const [confettiRecycle, setConfettiRecycle] = useState(true);
  const { width, height } = useWindowSize();

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);

    // Check if all todos are completed
    if (updatedTodos.every(todo => todo.completed)) {
      setConfetti(true);
      setConfettiDuration(10000); // 10 seconds
      setConfettiRecycle(true);
      const timer = setTimeout(() => {
        setConfetti(false);
        setConfettiRecycle(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    // Trigger confetti effect only when all todos are completed
    if (todos.length > 0 && todos.every(todo => todo.completed)) {
      setConfetti(true);
      setConfettiDuration(10000); // 10 seconds
      setConfettiRecycle(true);
      const timer = setTimeout(() => {
        setConfetti(false);
        setConfettiRecycle(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [todos]);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      {confetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={500}
          recycle={confettiRecycle}
          run={confetti}
        />
      )}
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input
            placeholder="Add a new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <Button onClick={addTodo} colorScheme="teal">
            Add
          </Button>
        </HStack>
        <VStack spacing={2} width="100%">
          {todos.map((todo, index) => (
            <HStack key={index} width="100%" justifyContent="space-between">
              <Checkbox isChecked={todo.completed} onChange={() => toggleTodo(index)}>
                <Text as={todo.completed ? "s" : ""}>{todo.text}</Text>
              </Checkbox>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;