# 🚀 Dynamic Arrays

- Implemented using arrays
- if the array is full, a new array with 50% more capacity is created and all elements are copied to the new array
- If we know we are going to store many items, we can set the initial size of Dynamic Array as large value to avoid resizing
- If items need to be inserted / deleted from front, then the whole array needs to be shifted right.
- Access is fast as the array can be accessed directly using indexes

## Code


```java
public class ArrayList {
    private int[] array;
    public int size;
    public int capacity;

    public ArrayList(int capacity) {
        array = new int[capacity];
        size = 0;
        this.capacity = capacity;
    }

    public int get(int i) {
        return array[i];
    }

    public void set(int i, int n) {
        array[i] = n;
    }

    public void push(int n) {
        if (size == capacity) {
            increaseSize();
        }
        array[size] = n;
        size++;
    }

    public void pop() {
        size--;
    }

    public void increaseSize() {
        int[] newArray = new int[capacity * 2];
        System.arraycopy(array, 0, newArray, 0, array.length);
        array = newArray;
        capacity *= 2;
    }

}
```

