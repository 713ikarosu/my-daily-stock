// app/index.tsx
import React, { useState } from 'react'
import { Button, H2, Paragraph, YStack, XStack, Input, Card } from 'tamagui'
import { Plus, Minus, X } from '@tamagui/lucide-icons'

interface StockItem {
  id: string
  name: string
  quantity: number
}

const initialItems: StockItem[] = [
  { id: '1', name: 'シャンプー', quantity: 2 },
  { id: '2', name: 'ティッシュ', quantity: 3 },
  { id: '3', name: 'トイレットペーパー', quantity: 1 },
]

export default function HomeScreen() {
  const [items, setItems] = useState<StockItem[]>(initialItems)
  const [newItemName, setNewItemName] = useState('')

  const decreaseQuantity = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
    )
  }

  const increaseQuantity = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    )
  }

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const addItem = () => {
    if (newItemName.trim() === '') {
      alert('アイテム名を入力してや！')
      return
    }
    const newItem: StockItem = {
      id: String(Date.now()),
      name: newItemName.trim(),
      quantity: 0,
    }
    setItems((prevItems) => [...prevItems, newItem])
    setNewItemName('')
  }

  return (
    <YStack
      gap="$4"
      height="100%"
      backgroundColor="$blue2"
      alignItems="center"
      justifyContent="flex-start"
      paddingTop={16}
      padding="$4"
    >
      <H2
        textAlign="center"
        width="100%"
        color="$green8"
        borderColor="$green8"
        borderWidth={1}
        borderRadius={16}
        padding={16}
      >
        My Stock
      </H2>

      <YStack gap="$6" width="100%" maxWidth={600}>
        <XStack gap="$2" alignItems="center">
          <Input
            flex={1}
            placeholder="New Item"
            value={newItemName}
            onChangeText={setNewItemName}
          />
          <Button size="$4" onPress={addItem} icon={Plus}>
            追加
          </Button>
        </XStack>

        <YStack gap="$3">
          {items.map((item) => (
            <Card
              key={item.id}
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              p={12}
              backgroundColor="$blue3"
              borderColor="$blue5"
              borderWidth={1}
              borderRadius={24}
              animation="quick"
              hoverStyle={{
                scale: 1.02,
                backgroundColor: '$blue6',
                borderColor: '$blue10',
              }}
            >
              <YStack flex={1}>
                <Paragraph fontSize="$6" fontWeight="bold">
                  {item.name}
                </Paragraph>
                <Paragraph fontSize="$4" color="$color11">
                  残り: {item.quantity}
                </Paragraph>
              </YStack>

              <XStack gap="$2">
                <Button size="$2" onPress={() => decreaseQuantity(item.id)} icon={Minus} />
                <Button size="$2" onPress={() => increaseQuantity(item.id)} icon={Plus} />
                <Button size="$2" onPress={() => removeItem(item.id)} icon={X} bg="$red10" />
              </XStack>
            </Card>
          ))}
        </YStack>
      </YStack>
    </YStack>
  )
}
