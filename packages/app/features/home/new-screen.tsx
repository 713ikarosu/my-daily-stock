// app/index.tsx
import React, { useState } from 'react'
import { Button, H2, Paragraph, YStack, XStack, Input } from 'tamagui'
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
      flex={1}
      space
      style={{
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 32,
        paddingHorizontal: 16,
      }}
    >
      <H2 style={{ textAlign: 'center' }}>日用品在庫管理アプリ</H2>

      <XStack space="$2" style={{ alignItems: 'center', width: '100%', maxWidth: 400 }}>
        <Input
          flex={1}
          placeholder="新しいアイテム名"
          value={newItemName}
          onChangeText={setNewItemName}
        />
        <Button size="$3" onPress={addItem} icon={Plus}>
          追加
        </Button>
      </XStack>

      <YStack style={{ width: '100%', maxWidth: 400 }} space="$2">
        {items.map((item) => (
          <XStack
            key={item.id}
            space
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 12,
              borderRadius: 24,
              borderColor: '#888',
              borderWidth: 1,
              backgroundColor: 'white',
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

            <XStack space="$2">
              <Button size="$2" onPress={() => decreaseQuantity(item.id)} icon={Minus} />
              <Button size="$2" onPress={() => increaseQuantity(item.id)} icon={Plus} />
              <Button size="$2" onPress={() => removeItem(item.id)} icon={X} bg="$red10" />
            </XStack>
          </XStack>
        ))}
      </YStack>
    </YStack>
  )
}
