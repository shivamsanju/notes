# 🚀 Linked Lists

- Implemented using links (nodes and references)
- Insertion / removal is fast as we just need to change linking of nodes
- Access is slow as we have to traverse each node
- We can use this to implement stack or queue, but `ArrayDeque` is faster for those.

## Code


```java
import java.util.ArrayList;

class Node {
    int value;
    Node next;

    public Node(int value) {
        this.value = value;
    }

}

public class LinkedList {
    Node head;
    Node tail;
    int size;

    public LinkedList() {

    }

    public int get(int index) {
        if(index > size) throw new IndexOutOfBoundsException();
        Node node = head;
        for (int i = 0; i < index; i++) {
            node = node.next;
        }
        return node.value;
    }

    public void insertHead(int val) {
        Node node = new Node(val);
        if (head != null) {
            Node oldHead = head;
            head = node;
            head.next = oldHead;
        } else {
            head = node;
            tail = head;
        }
        size++;

    }

    public void insertTail(int val) {
        Node node = new Node(val);
        tail.next = node;
        tail = node;
        size++;
    }

    public boolean remove(int index) {
        if(index > size) return false;
        Node node = head;
        for (int i = 0; i < index - 1; i++) {
            node = node.next;
        }
        if (node.next != null) {
            node.next = node.next.next;
            size--;
            return true;
        }
        return false;
    }

    public ArrayList<Integer> getValues() {
        ArrayList<Integer> values = new ArrayList<>();
        Node node = head;
        while (node != null) {
            values.add(node.value);
            node = node.next;
        }
        return values;
    }
}
```

