"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Play, Pause, RotateCcw, SkipForward, Settings, MessageCircle, Send, Code, Bot, User } from "lucide-react"

const algorithms = {
  bubble: { name: "Bubble Sort", type: "sorting", complexity: "O(n²)" },
  quick: { name: "Quick Sort", type: "sorting", complexity: "O(n log n)" },
  merge: { name: "Merge Sort", type: "sorting", complexity: "O(n log n)" },
  selection: { name: "Selection Sort", type: "sorting", complexity: "O(n²)" },
  insertion: { name: "Insertion Sort", type: "sorting", complexity: "O(n²)" },
  linear: { name: "Linear Search", type: "searching", complexity: "O(n)" },
  binary: { name: "Binary Search", type: "searching", complexity: "O(log n)" },
}

const sampleQuestions = [
  {
    id: 1,
    question: "What is the time complexity of Bubble Sort and why?",
    answer: "O(n²) because it uses nested loops - outer loop runs n times and inner loop runs n-1, n-2, ... times",
    code: {
      language: "python",
      content: `def bubble_sort(arr):
    n = len(arr)
    comparisons = 0
    
    # Outer loop runs n-1 times
    for i in range(n-1):
        # Inner loop runs n-1-i times
        for j in range(n-1-i):
            comparisons += 1
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    
    print(f"Total comparisons: {comparisons}")
    return arr

# Example with 5 elements
test_array = [64, 34, 25, 12, 22]
print("Original array:", test_array)
sorted_array = bubble_sort(test_array.copy())
print("Sorted array:", sorted_array)

# For n=5, comparisons = 4+3+2+1 = 10 = n*(n-1)/2`,
    },
    explanation:
      "Bubble Sort has O(n²) complexity because it compares each element with every other element. The nested loops create n*(n-1)/2 comparisons in the worst case.",
  },
  {
    id: 2,
    question: "How does Binary Search achieve O(log n) complexity?",
    answer: "By eliminating half of the search space with each comparison, reducing the problem size exponentially",
    code: {
      language: "javascript",
      content: `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let steps = 0;
    
    console.log("Searching for:", target);
    console.log("Array:", arr);
    
    while (left <= right) {
        steps++;
        let mid = Math.floor((left + right) / 2);
        console.log(\`Step \${steps}: Checking position \${mid}, value \${arr[mid]}\`);
        
        if (arr[mid] === target) {
            console.log(\`Found \${target} at position \${mid} in \${steps} steps\`);
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
            console.log("Target is larger, searching right half");
        } else {
            right = mid - 1;
            console.log("Target is smaller, searching left half");
        }
    }
    
    console.log(\`Target \${target} not found after \${steps} steps\`);
    return -1;
}

// Example: Search in array of 16 elements
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31];
binarySearch(sortedArray, 15);

// For n=16, maximum steps = log₂(16) = 4 steps`,
    },
    explanation:
      "Binary Search achieves O(log n) by halving the search space each time. With each comparison, we eliminate half of the remaining elements, so we need at most log₂(n) steps.",
  },
  {
    id: 3,
    question: "What makes Quick Sort efficient and when does it perform poorly?",
    answer:
      "Efficient due to in-place partitioning and divide-conquer. Performs poorly with already sorted arrays when using first/last element as pivot",
    code: {
      language: "java",
      content: `public class QuickSortAnalysis {
    static int comparisons = 0;
    
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
    
    public static int partition(int[] arr, int low, int high) {
        int pivot = arr[high]; // Last element as pivot
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            comparisons++;
            if (arr[j] < pivot) {
                i++;
                // Swap arr[i] and arr[j]
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        
        // Swap arr[i+1] and arr[high]
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        
        return i + 1;
    }
    
    public static void main(String[] args) {
        // Best case: Random array
        int[] randomArray = {3, 6, 8, 10, 1, 2, 1};
        comparisons = 0;
        quickSort(randomArray, 0, randomArray.length - 1);
        System.out.println("Random array comparisons: " + comparisons);
        
        // Worst case: Already sorted array
        int[] sortedArray = {1, 2, 3, 4, 5, 6, 7};
        comparisons = 0;
        quickSort(sortedArray, 0, sortedArray.length - 1);
        System.out.println("Sorted array comparisons: " + comparisons);
    }
}`,
    },
    explanation:
      "Quick Sort is efficient because it sorts in-place and has good average-case performance O(n log n). However, it degrades to O(n²) when the pivot is always the smallest or largest element, which happens with already sorted arrays using naive pivot selection.",
  },
  {
    id: 4,
    question: "Why is Merge Sort stable and what does stability mean in sorting?",
    answer:
      "Stable means equal elements maintain their relative order. Merge Sort is stable because during merging, we always take from the left array first when elements are equal",
    code: {
      language: "cpp",
      content: `#include <iostream>
#include <vector>
using namespace std;

struct Student {
    string name;
    int grade;
    int originalOrder;
};

void merge(vector<Student>& arr, int left, int mid, int right) {
    vector<Student> leftArr(arr.begin() + left, arr.begin() + mid + 1);
    vector<Student> rightArr(arr.begin() + mid + 1, arr.begin() + right + 1);
    
    int i = 0, j = 0, k = left;
    
    while (i < leftArr.size() && j < rightArr.size()) {
        // Key point: <= ensures stability (left array element chosen when equal)
        if (leftArr[i].grade <= rightArr[j].grade) {
            arr[k++] = leftArr[i++];
        } else {
            arr[k++] = rightArr[j++];
        }
    }
    
    while (i < leftArr.size()) arr[k++] = leftArr[i++];
    while (j < rightArr.size()) arr[k++] = rightArr[j++];
}

void mergeSort(vector<Student>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

int main() {
    vector<Student> students = {
        {"Alice", 85, 1}, {"Bob", 90, 2}, {"Charlie", 85, 3}, 
        {"David", 90, 4}, {"Eve", 85, 5}
    };
    
    cout << "Before sorting:" << endl;
    for (auto& s : students) {
        cout << s.name << " (Grade: " << s.grade << ", Order: " << s.originalOrder << ")" << endl;
    }
    
    mergeSort(students, 0, students.size() - 1);
    
    cout << "\nAfter stable merge sort:" << endl;
    for (auto& s : students) {
        cout << s.name << " (Grade: " << s.grade << ", Order: " << s.originalOrder << ")" << endl;
    }
    
    return 0;
}`,
    },
    explanation:
      "Merge Sort is stable because when merging two sorted arrays, if elements are equal, we always choose from the left array first. This preserves the original relative order of equal elements, which is the definition of stability in sorting algorithms.",
  },
  {
    id: 5,
    question: "What is the space complexity of different sorting algorithms?",
    answer: "Bubble/Selection/Insertion: O(1), Quick Sort: O(log n) average, Merge Sort: O(n) due to temporary arrays",
    code: {
      language: "python",
      content: `import sys

def bubble_sort_space_analysis(arr):
    """Space Complexity: O(1) - only uses a few variables"""
    n = len(arr)
    temp_variables = 0  # Count temporary variables
    
    for i in range(n-1):
        for j in range(n-1-i):
            temp_variables = max(temp_variables, 2)  # i, j variables
            if arr[j] > arr[j+1]:
                # Only swapping in place, no extra space
                arr[j], arr[j+1] = arr[j+1], arr[j]
    
    print(f"Bubble Sort - Space used: O(1), temp variables: {temp_variables}")
    return arr

def merge_sort_space_analysis(arr):
    """Space Complexity: O(n) - creates temporary arrays"""
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort_space_analysis(arr[:mid])    # O(n/2) space
    right = merge_sort_space_analysis(arr[mid:])   # O(n/2) space
    
    # Merge requires additional O(n) space
    merged = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1
    
    merged.extend(left[i:])
    merged.extend(right[j:])
    
    print(f"Merge step: created array of size {len(merged)}")
    return merged

# Demonstrate space usage
test_array = [64, 34, 25, 12, 22, 11, 90]
print("Original array:", test_array)

print("\n--- Bubble Sort (In-place) ---")
bubble_result = bubble_sort_space_analysis(test_array.copy())

print("\n--- Merge Sort (Extra space) ---")
merge_result = merge_sort_space_analysis(test_array.copy())

print(f"\nSpace Complexity Summary:")
print(f"Bubble Sort: O(1) - sorts in place")
print(f"Merge Sort: O(n) - needs temporary arrays")
print(f"Quick Sort: O(log n) average - recursion stack")`,
    },
    explanation:
      "Space complexity varies significantly between algorithms. In-place algorithms like Bubble Sort use O(1) extra space, while Merge Sort needs O(n) for temporary arrays. Quick Sort uses O(log n) on average for the recursion stack, but O(n) in worst case.",
  },
]

export default function AlgorithmVisualizer() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble")
  const [array, setArray] = useState([])
  const [originalArray, setOriginalArray] = useState([])
  const [state, setState] = useState("idle")
  const [speed, setSpeed] = useState([50])
  const [arraySize, setArraySize] = useState([20])
  const [customInput, setCustomInput] = useState("")
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState([])
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0, timeComplexity: "" })
  const [searchTarget, setSearchTarget] = useState("")

  // Chatbot states
  const [showChatbot, setShowChatbot] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [userAnswer, setUserAnswer] = useState("")
  const [showCode, setShowCode] = useState(false)
  const [executedCode, setExecutedCode] = useState("")

  const intervalRef = useRef(null)

  // Initialize chatbot with welcome message
  useEffect(() => {
    setChatMessages([
      {
        type: "bot",
        content:
          "Hi! I'm your Algorithm Learning Assistant. I can help you understand algorithms better through questions and code examples. Would you like to try a sample question?",
        timestamp: new Date(),
      },
    ])
  }, [])

  // Generate random array
  const generateRandomArray = useCallback(() => {
    const newArray = []
    for (let i = 0; i < arraySize[0]; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 300) + 10,
        id: i,
      })
    }
    setArray(newArray)
    setOriginalArray([...newArray])
    setCurrentStep(0)
    setSteps([])
    setState("idle")
  }, [arraySize])

  // Parse custom input
  const handleCustomInput = () => {
    try {
      const values = customInput
        .split(",")
        .map((s) => Number.parseInt(s.trim()))
        .filter((n) => !isNaN(n))
      if (values.length > 0) {
        const newArray = values.map((value, index) => ({
          value,
          id: index,
        }))
        setArray(newArray)
        setOriginalArray([...newArray])
        setCurrentStep(0)
        setSteps([])
        setState("idle")
      }
    } catch (error) {
      console.error("Invalid input format")
    }
  }

  // Sorting Algorithms (keeping the same implementations)
  const bubbleSort = (arr) => {
    const steps = []
    const workingArray = [...arr]
    let comparisons = 0
    let swaps = 0

    for (let i = 0; i < workingArray.length - 1; i++) {
      for (let j = 0; j < workingArray.length - i - 1; j++) {
        const stepArray = workingArray.map((el, idx) => ({
          ...el,
          isComparing: idx === j || idx === j + 1,
          isSorted: idx >= workingArray.length - i,
        }))

        comparisons++
        steps.push({
          array: [...stepArray],
          comparisons,
          swaps,
          description: `Comparing elements at positions ${j} and ${j + 1}`,
        })

        if (workingArray[j].value > workingArray[j + 1].value) {
          ;[workingArray[j], workingArray[j + 1]] = [workingArray[j + 1], workingArray[j]]
          swaps++

          const swapArray = workingArray.map((el, idx) => ({
            ...el,
            isSwapping: idx === j || idx === j + 1,
            isSorted: idx >= workingArray.length - i,
          }))

          steps.push({
            array: [...swapArray],
            comparisons,
            swaps,
            description: `Swapped elements at positions ${j} and ${j + 1}`,
          })
        }
      }
    }

    const finalArray = workingArray.map((el) => ({ ...el, isSorted: true }))
    steps.push({
      array: finalArray,
      comparisons,
      swaps,
      description: "Sorting completed!",
    })

    return steps
  }

  const quickSort = (arr) => {
    const steps = []
    const workingArray = [...arr]
    let comparisons = 0
    let swaps = 0

    const partition = (low, high) => {
      const pivot = workingArray[high]
      let i = low - 1

      const pivotArray = workingArray.map((el, idx) => ({
        ...el,
        isPivot: idx === high,
      }))
      steps.push({
        array: [...pivotArray],
        comparisons,
        swaps,
        description: `Selected pivot: ${pivot.value} at position ${high}`,
      })

      for (let j = low; j < high; j++) {
        comparisons++
        const compareArray = workingArray.map((el, idx) => ({
          ...el,
          isPivot: idx === high,
          isComparing: idx === j,
        }))
        steps.push({
          array: [...compareArray],
          comparisons,
          swaps,
          description: `Comparing ${workingArray[j].value} with pivot ${pivot.value}`,
        })

        if (workingArray[j].value < pivot.value) {
          i++
          if (i !== j) {
            ;[workingArray[i], workingArray[j]] = [workingArray[j], workingArray[i]]
            swaps++

            const swapArray = workingArray.map((el, idx) => ({
              ...el,
              isPivot: idx === high,
              isSwapping: idx === i || idx === j,
            }))
            steps.push({
              array: [...swapArray],
              comparisons,
              swaps,
              description: `Swapped ${workingArray[j].value} and ${workingArray[i].value}`,
            })
          }
        }
      }
      ;[workingArray[i + 1], workingArray[high]] = [workingArray[high], workingArray[i + 1]]
      swaps++

      const finalSwapArray = workingArray.map((el, idx) => ({
        ...el,
        isSwapping: idx === i + 1 || idx === high,
        isSorted: idx === i + 1,
      }))
      steps.push({
        array: [...finalSwapArray],
        comparisons,
        swaps,
        description: `Placed pivot in correct position: ${i + 1}`,
      })

      return i + 1
    }

    const quickSortHelper = (low, high) => {
      if (low < high) {
        const pi = partition(low, high)
        quickSortHelper(low, pi - 1)
        quickSortHelper(pi + 1, high)
      }
    }

    quickSortHelper(0, workingArray.length - 1)

    const finalArray = workingArray.map((el) => ({ ...el, isSorted: true, isPivot: false }))
    steps.push({
      array: finalArray,
      comparisons,
      swaps,
      description: "Quick sort completed!",
    })

    return steps
  }

  const linearSearch = (arr, target) => {
    const steps = []
    let comparisons = 0

    for (let i = 0; i < arr.length; i++) {
      comparisons++
      const stepArray = arr.map((el, idx) => ({
        ...el,
        isComparing: idx === i,
        isFound: idx === i && el.value === target,
      }))

      steps.push({
        array: [...stepArray],
        comparisons,
        swaps: 0,
        description:
          arr[i].value === target
            ? `Found target ${target} at position ${i}!`
            : `Checking position ${i}: ${arr[i].value} ≠ ${target}`,
      })

      if (arr[i].value === target) {
        break
      }
    }

    return steps
  }

  const binarySearch = (arr, target) => {
    const steps = []
    const sortedArray = [...arr].sort((a, b) => a.value - b.value)
    let comparisons = 0
    let left = 0
    let right = sortedArray.length - 1

    steps.push({
      array: sortedArray.map((el) => ({ ...el, isSorted: true })),
      comparisons,
      swaps: 0,
      description: "Array sorted for binary search",
    })

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      comparisons++

      const stepArray = sortedArray.map((el, idx) => ({
        ...el,
        isComparing: idx === mid,
        isPivot: idx >= left && idx <= right,
      }))

      steps.push({
        array: [...stepArray],
        comparisons,
        swaps: 0,
        description: `Checking middle element at position ${mid}: ${sortedArray[mid].value}`,
      })

      if (sortedArray[mid].value === target) {
        const foundArray = sortedArray.map((el, idx) => ({
          ...el,
          isFound: idx === mid,
        }))
        steps.push({
          array: foundArray,
          comparisons,
          swaps: 0,
          description: `Found target ${target} at position ${mid}!`,
        })
        break
      } else if (sortedArray[mid].value < target) {
        left = mid + 1
        steps.push({
          array: [...stepArray],
          comparisons,
          swaps: 0,
          description: `${sortedArray[mid].value} < ${target}, searching right half`,
        })
      } else {
        right = mid - 1
        steps.push({
          array: [...stepArray],
          comparisons,
          swaps: 0,
          description: `${sortedArray[mid].value} > ${target}, searching left half`,
        })
      }
    }

    if (left > right) {
      steps.push({
        array: sortedArray,
        comparisons,
        swaps: 0,
        description: `Target ${target} not found in array`,
      })
    }

    return steps
  }

  // Execute algorithm
  const executeAlgorithm = () => {
    let algorithmSteps = []

    switch (selectedAlgorithm) {
      case "bubble":
        algorithmSteps = bubbleSort(array)
        break
      case "quick":
        algorithmSteps = quickSort(array)
        break
      case "linear":
        const target = Number.parseInt(searchTarget) || array[0]?.value || 0
        algorithmSteps = linearSearch(array, target)
        break
      case "binary":
        const binaryTarget = Number.parseInt(searchTarget) || array[0]?.value || 0
        algorithmSteps = binarySearch(array, binaryTarget)
        break
      default:
        algorithmSteps = bubbleSort(array)
    }

    setSteps(algorithmSteps)
    setCurrentStep(0)
    setState("running")
  }

  // Animation control
  useEffect(() => {
    if (state === "running" && steps.length > 0) {
      intervalRef.current = setInterval(
        () => {
          setCurrentStep((prev) => {
            if (prev >= steps.length - 1) {
              setState("completed")
              return prev
            }
            return prev + 1
          })
        },
        1100 - speed[0] * 10,
      )
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [state, steps, speed])

  // Update display based on current step
  useEffect(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      const step = steps[currentStep]
      setArray(step.array)
      setStats({
        comparisons: step.comparisons,
        swaps: step.swaps,
        timeComplexity: algorithms[selectedAlgorithm].complexity,
      })
    }
  }, [currentStep, steps, selectedAlgorithm])

  // Initialize with random array
  useEffect(() => {
    generateRandomArray()
  }, [generateRandomArray])

  // Chatbot functions
  const addMessage = (type, content) => {
    setChatMessages((prev) => [
      ...prev,
      {
        type,
        content,
        timestamp: new Date(),
      },
    ])
  }

  const askSampleQuestion = () => {
    const randomQuestion = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)]
    setCurrentQuestion(randomQuestion)
    addMessage("bot", `Here's a question for you:\n\n${randomQuestion.question}`)
    addMessage("bot", "Take your time to think about it and type your answer below!")
  }

  const submitAnswer = () => {
    if (!currentQuestion || !userAnswer.trim()) return

    addMessage("user", userAnswer)

    // Simple answer checking (you could make this more sophisticated)
    const isCorrect = userAnswer
      .toLowerCase()
      .includes(currentQuestion.answer.toLowerCase().split(" ")[0].toLowerCase())

    if (isCorrect) {
      addMessage("bot", "Great job! That's correct! 🎉")
      addMessage("bot", `Detailed answer: ${currentQuestion.answer}`)
    } else {
      addMessage("bot", "Good attempt! Let me show you the correct answer and demonstrate with code:")
      addMessage("bot", `Answer: ${currentQuestion.answer}`)

      // Show code execution
      setTimeout(() => {
        setShowCode(true)
        setExecutedCode(currentQuestion.code.content)
        addMessage("bot", `Here's a ${currentQuestion.code.language} example that demonstrates this concept:`)
        addMessage("code", {
          language: currentQuestion.code.language,
          content: currentQuestion.code.content,
          explanation: currentQuestion.explanation,
        })
      }, 1000)
    }

    setUserAnswer("")
    setCurrentQuestion(null)
  }

  const handlePlay = () => {
    if (state === "idle") {
      executeAlgorithm()
    } else if (state === "paused") {
      setState("running")
    } else if (state === "running") {
      setState("paused")
    }
  }

  const handleReset = () => {
    setState("idle")
    setArray([...originalArray])
    setCurrentStep(0)
    setSteps([])
    setStats({ comparisons: 0, swaps: 0, timeComplexity: algorithms[selectedAlgorithm].complexity })
  }

  const handleStepForward = () => {
    if (steps.length > 0 && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const isSearchAlgorithm = algorithms[selectedAlgorithm].type === "searching"

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white">Algorithm Visualizer</h1>
          <p className="text-lg text-gray-300">
            Interactive platform for understanding algorithms through visualization and AI assistance
          </p>
        </div>

        {/* Controls */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Settings className="w-5 h-5" />
              Algorithm Controls
            </CardTitle>
            <CardDescription className="text-gray-300">
              Select an algorithm and customize the visualization parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-200">Algorithm</Label>
                <Select value={selectedAlgorithm} onValueChange={(value) => setSelectedAlgorithm(value)}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="bubble">Bubble Sort</SelectItem>
                    <SelectItem value="quick">Quick Sort</SelectItem>
                    <SelectItem value="merge">Merge Sort</SelectItem>
                    <SelectItem value="selection">Selection Sort</SelectItem>
                    <SelectItem value="insertion">Insertion Sort</SelectItem>
                    <SelectItem value="linear">Linear Search</SelectItem>
                    <SelectItem value="binary">Binary Search</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-200">Speed: {speed[0]}%</Label>
                <Slider value={speed} onValueChange={setSpeed} max={100} min={1} step={1} className="w-full" />
              </div>

              {!isSearchAlgorithm && (
                <div className="space-y-2">
                  <Label className="text-gray-200">Array Size: {arraySize[0]}</Label>
                  <Slider value={arraySize} onValueChange={setArraySize} max={50} min={5} step={1} className="w-full" />
                </div>
              )}

              {isSearchAlgorithm && (
                <div className="space-y-2">
                  <Label className="text-gray-200">Search Target</Label>
                  <Input
                    type="number"
                    value={searchTarget}
                    onChange={(e) => setSearchTarget(e.target.value)}
                    placeholder="Enter target value"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={handlePlay} variant="default">
                {state === "running" ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {state === "running" ? "Pause" : state === "paused" ? "Resume" : "Start"}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-gray-600 text-gray-200 hover:bg-gray-700 bg-transparent"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button
                onClick={handleStepForward}
                variant="outline"
                disabled={state === "running" || currentStep >= steps.length - 1}
                className="border-gray-600 text-gray-200 hover:bg-gray-700"
              >
                <SkipForward className="w-4 h-4 mr-2" />
                Step
              </Button>
              <Button
                onClick={generateRandomArray}
                variant="outline"
                className="border-gray-600 text-gray-200 hover:bg-gray-700 bg-transparent"
              >
                Generate Random
              </Button>
              <Button
                onClick={() => setShowChatbot(!showChatbot)}
                variant="outline"
                className="border-blue-600 text-blue-400 hover:bg-blue-900"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                AI Assistant
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-200">Custom Input (comma-separated numbers)</Label>
              <div className="flex gap-2">
                <Input
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="e.g., 64, 34, 25, 12, 22, 11, 90"
                  className="flex-1 bg-gray-700 border-gray-600 text-white"
                />
                <Button
                  onClick={handleCustomInput}
                  variant="outline"
                  className="border-gray-600 text-gray-200 hover:bg-gray-700 bg-transparent"
                >
                  Apply
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Algorithm Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white">{algorithms[selectedAlgorithm].name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Type:</span>
                  <Badge variant="secondary" className="bg-gray-700 text-gray-200">
                    {algorithms[selectedAlgorithm].type}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Complexity:</span>
                  <Badge variant="outline" className="border-gray-600 text-gray-200">
                    {algorithms[selectedAlgorithm].complexity}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white">Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Comparisons:</span>
                  <span className="font-mono text-white">{stats.comparisons}</span>
                </div>
                {!isSearchAlgorithm && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Swaps:</span>
                    <span className="font-mono text-white">{stats.swaps}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Progress:</span>
                  <span className="font-mono text-white">
                    {steps.length > 0 ? `${currentStep + 1}/${steps.length}` : "0/0"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white">Current Step</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">
                {steps.length > 0 && currentStep < steps.length
                  ? steps[currentStep].description
                  : "Ready to start visualization"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Algorithm Explanation */}
          <div className="lg:col-span-2 space-y-6">
            {/* Algorithm Explanation */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">How {algorithms[selectedAlgorithm].name} Works</CardTitle>
                <CardDescription className="text-gray-300">Understanding the algorithm step by step</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedAlgorithm === "bubble" && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg text-white">Algorithm Steps:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                      <li>Compare adjacent elements in the array</li>
                      <li>If the left element is greater than the right, swap them</li>
                      <li>Continue through the entire array</li>
                      <li>Repeat until no more swaps are needed</li>
                      <li>The largest elements "bubble up" to the end</li>
                    </ol>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <h5 className="font-medium mb-2 text-white">Why it's called "Bubble Sort":</h5>
                      <p className="text-sm text-gray-300">
                        Like bubbles rising to the surface, the largest elements gradually move to the end of the array
                        with each pass.
                      </p>
                    </div>
                  </div>
                )}

                {selectedAlgorithm === "quick" && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg text-white">Algorithm Steps:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                      <li>Choose a pivot element (usually the last element)</li>
                      <li>Partition: move smaller elements to the left, larger to the right</li>
                      <li>Place the pivot in its correct sorted position</li>
                      <li>Recursively apply the same process to left and right subarrays</li>
                      <li>Continue until all elements are in their correct positions</li>
                    </ol>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <h5 className="font-medium mb-2 text-white">Key Insight:</h5>
                      <p className="text-sm text-gray-300">
                        Quick Sort uses "divide and conquer" - it breaks the problem into smaller subproblems and solves
                        them independently.
                      </p>
                    </div>
                  </div>
                )}

                {selectedAlgorithm === "linear" && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg text-white">Algorithm Steps:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                      <li>Start from the first element of the array</li>
                      <li>Compare the current element with the target value</li>
                      <li>If they match, return the position (found!)</li>
                      <li>If not, move to the next element</li>
                      <li>Repeat until found or end of array is reached</li>
                    </ol>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <h5 className="font-medium mb-2 text-white">When to use Linear Search:</h5>
                      <p className="text-sm text-gray-300">
                        Best for unsorted arrays or when you need to find all occurrences. Simple but can be slow for
                        large datasets.
                      </p>
                    </div>
                  </div>
                )}

                {selectedAlgorithm === "binary" && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg text-white">Algorithm Steps:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                      <li>Array must be sorted first</li>
                      <li>Find the middle element</li>
                      <li>Compare middle element with target</li>
                      <li>If equal, found! If target is smaller, search left half</li>
                      <li>If target is larger, search right half</li>
                      <li>Repeat until found or search space is empty</li>
                    </ol>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <h5 className="font-medium mb-2 text-white">Why it's so fast:</h5>
                      <p className="text-sm text-gray-300">
                        Each comparison eliminates half of the remaining elements, making it much faster than linear
                        search for sorted data.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Visualization */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Visual Representation</CardTitle>
                <CardDescription className="text-gray-300">
                  {isSearchAlgorithm
                    ? `Searching for value: ${searchTarget || "N/A"}`
                    : "Watch how elements move and get sorted"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Array Visualization */}
                  <div className="bg-gray-900 rounded-lg p-6 border-2 border-gray-600">
                    <div className="flex items-end justify-center gap-2 min-h-[300px] overflow-x-auto pb-4">
                      {array.map((element, index) => (
                        <div
                          key={element.id}
                          className="flex flex-col items-center space-y-2 transition-all duration-500 ease-in-out"
                        >
                          {/* Element indicator */}
                          <div className="text-xs font-medium text-gray-400 h-4">
                            {element.isComparing && "👀"}
                            {element.isSwapping && "🔄"}
                            {element.isPivot && "📍"}
                            {element.isSorted && "✅"}
                            {element.isFound && "🎯"}
                          </div>

                          {/* Bar representation */}
                          <div
                            className={`
                      relative w-8 rounded-t-lg border-2 transition-all duration-500 ease-in-out flex items-end justify-center
                      ${element.isComparing ? "bg-yellow-400 border-yellow-500 shadow-lg transform scale-110" : ""}
                      ${element.isSwapping ? "bg-red-400 border-red-500 shadow-lg transform scale-110 animate-pulse" : ""}
                      ${element.isPivot ? "bg-purple-400 border-purple-500 shadow-lg" : ""}
                      ${element.isSorted ? "bg-green-400 border-green-500" : ""}
                      ${element.isFound ? "bg-blue-400 border-blue-500 shadow-lg transform scale-110" : ""}
                      ${
                        !element.isComparing &&
                        !element.isSwapping &&
                        !element.isPivot &&
                        !element.isSorted &&
                        !element.isFound
                          ? "bg-gray-500 border-gray-400"
                          : ""
                      }
                    `}
                            style={{
                              height: `${Math.max(element.value * 1.5, 30)}px`,
                              minHeight: "30px",
                            }}
                          >
                            {/* Value label inside bar */}
                            <span className="text-xs font-bold text-gray-900 mb-1">{element.value}</span>
                          </div>

                          {/* Index label */}
                          <div className="text-xs text-gray-400 font-mono">[{index}]</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Legend with explanations */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-sm">
                    <div className="flex items-center gap-2 p-2 bg-gray-700 rounded">
                      <div className="w-4 h-4 bg-gray-500 border border-gray-400 rounded"></div>
                      <span className="text-gray-200">Unsorted</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-yellow-900 rounded">
                      <div className="w-4 h-4 bg-yellow-400 border border-yellow-500 rounded"></div>
                      <span className="text-gray-200">Comparing 👀</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-red-900 rounded">
                      <div className="w-4 h-4 bg-red-400 border border-red-500 rounded"></div>
                      <span className="text-gray-200">Swapping 🔄</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-purple-900 rounded">
                      <div className="w-4 h-4 bg-purple-400 border border-purple-500 rounded"></div>
                      <span className="text-gray-200">Pivot 📍</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-green-900 rounded">
                      <div className="w-4 h-4 bg-green-400 border border-green-500 rounded"></div>
                      <span className="text-gray-200">Sorted ✅</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-blue-900 rounded">
                      <div className="w-4 h-4 bg-blue-400 border border-blue-500 rounded"></div>
                      <span className="text-gray-200">Found 🎯</span>
                    </div>
                  </div>

                  {/* Step Navigator */}
                  {steps.length > 0 && (
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-semibold mb-3 text-white">Step Navigator</h4>
                      <div className="flex gap-1 overflow-x-auto pb-2">
                        {steps.map((step, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setCurrentStep(index)
                              setState("paused")
                            }}
                            className={`
                      px-3 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors
                      ${
                        index === currentStep
                          ? "bg-blue-500 text-white"
                          : index < currentStep
                            ? "bg-green-600 text-white hover:bg-green-500"
                            : "bg-gray-600 text-gray-200 hover:bg-gray-500"
                      }
                    `}
                          >
                            {index + 1}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Click any step number to jump to that point in the algorithm
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Chatbot */}
          {showChatbot && (
            <div className="lg:col-span-1">
              <Card className="bg-gray-800 border-gray-700 h-[600px] flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Bot className="w-5 h-5 text-blue-400" />
                    AI Learning Assistant
                  </CardTitle>
                  <CardDescription className="text-gray-300">Ask questions and test your knowledge</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col space-y-4">
                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto space-y-3 bg-gray-900 p-3 rounded-lg">
                    {chatMessages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex gap-2 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex gap-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                              message.type === "user" ? "bg-blue-600" : "bg-green-600"
                            }`}
                          >
                            {message.type === "user" ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                          </div>
                          <div
                            className={`p-3 rounded-lg ${
                              message.type === "user"
                                ? "bg-blue-600 text-white"
                                : message.type === "code"
                                  ? "bg-gray-800 border border-gray-600"
                                  : "bg-gray-700 text-gray-100"
                            }`}
                          >
                            {message.type === "code" ? (
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                  <Code className="w-4 h-4" />
                                  {message.content.language.toUpperCase()} Code Example
                                </div>
                                <pre className="text-xs bg-gray-900 p-2 rounded overflow-x-auto">
                                  <code>{message.content.content}</code>
                                </pre>
                                <div className="text-sm text-gray-300 border-t border-gray-600 pt-2">
                                  <strong>Explanation:</strong> {message.content.explanation}
                                </div>
                              </div>
                            ) : (
                              <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <Button
                      onClick={askSampleQuestion}
                      variant="outline"
                      size="sm"
                      className="w-full border-blue-600 text-blue-400 hover:bg-blue-900 bg-transparent"
                    >
                      Ask Me a Question 🤔
                    </Button>
                  </div>

                  {/* Answer Input */}
                  {currentQuestion && (
                    <div className="space-y-2">
                      <Label className="text-gray-200">Your Answer:</Label>
                      <div className="flex gap-2">
                        <Textarea
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          placeholder="Type your answer here..."
                          className="flex-1 bg-gray-700 border-gray-600 text-white resize-none"
                          rows={3}
                        />
                        <Button onClick={submitAnswer} size="sm" className="self-end" disabled={!userAnswer.trim()}>
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Current Step Explanation (when chatbot is closed) */}
          {!showChatbot && (
            <div className="lg:col-span-1">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Current Step Explanation</CardTitle>
                  <CardDescription className="text-gray-300">What's happening right now</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-900 border-l-4 border-blue-400 p-4 rounded">
                      <h4 className="font-semibold text-blue-200 mb-2">
                        Step {steps.length > 0 ? currentStep + 1 : 0} of {steps.length}
                      </h4>
                      <p className="text-blue-100">
                        {steps.length > 0 && currentStep < steps.length
                          ? steps[currentStep].description
                          : "Click 'Start' to begin the algorithm visualization"}
                      </p>
                    </div>

                    {steps.length > 0 && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-700 p-3 rounded">
                            <div className="text-sm text-gray-400">Comparisons Made</div>
                            <div className="text-2xl font-bold text-white">{stats.comparisons}</div>
                          </div>
                          {!isSearchAlgorithm && (
                            <div className="bg-gray-700 p-3 rounded">
                              <div className="text-sm text-gray-400">Swaps Made</div>
                              <div className="text-2xl font-bold text-white">{stats.swaps}</div>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-gray-300">
                            <span>Progress</span>
                            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
