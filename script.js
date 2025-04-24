const container = document.getElementById("array-container");
let array = [];

function generateArray(size) {
  array = [];
  container.innerHTML = '';
  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 400) + 10;
    array.push(value);
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value}px`;
    container.appendChild(bar);
  }
}

document.getElementById("randomize").addEventListener("click", () => {
  const size = document.getElementById("array-size").value;
  generateArray(size);
});

document.getElementById("sort").addEventListener("click", () => {
  const algorithm = document.getElementById("algo-select").value;
  if (algorithm === "bubble") bubbleSort();
  else if (algorithm === "insertion") insertionSort();
  else if (algorithm === "selection") selectionSort();
  else if (algorithm === "merge") mergeSortWrapper();
  else if (algorithm === "quick") quickSortWrapper();
});

async function bubbleSort() {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.background = "red";
      bars[j + 1].style.background = "red";
      await sleep(100);
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        bars[j].style.height = `${array[j]}px`;
        bars[j + 1].style.height = `${array[j + 1]}px`;
      }
      bars[j].style.background = "linear-gradient(to top, #00f2fe, #4facfe)";
      bars[j + 1].style.background = "linear-gradient(to top, #00f2fe, #4facfe)";
    }
  }
}

async function insertionSort() {
  let bars = document.getElementsByClassName("bar");
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = `${array[j + 1]}px`;
      j = j - 1;
      await sleep(100);
    }
    array[j + 1] = key;
    bars[j + 1].style.height = `${key}px`;
  }
}
async function selectionSort() {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < array.length; j++) {
        bars[minIdx].style.background = "red";
        bars[j].style.background = "yellow";
        await sleep(50);
        if (array[j] < array[minIdx]) {
          minIdx = j;
        }
        bars[j].style.background = "linear-gradient(to top, #00f2fe, #4facfe)";
      }
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[minIdx].style.height = `${array[minIdx]}px`;
      bars[minIdx].style.background = "linear-gradient(to top, #00f2fe, #4facfe)";
    }
  }
  function mergeSortWrapper() {
    mergeSort(array, 0, array.length - 1);
  }
  async function mergeSort(arr, l, r) {
    if (l >= r) return;
  
    const m = Math.floor((l + r) / 2);
    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);
    await merge(arr, l, m, r);
  }
  
  async function merge(arr, l, m, r) {
    let bars = document.getElementsByClassName("bar");
    let left = arr.slice(l, m + 1);
    let right = arr.slice(m + 1, r + 1);
  
    let i = 0, j = 0, k = l;
  
    while (i < left.length && j < right.length) {
      bars[k].style.background = "red";
      await sleep(50);
  
      if (left[i] <= right[j]) {
        arr[k] = left[i];
        bars[k].style.height = `${arr[k]}px`;
        i++;
      } else {
        arr[k] = right[j];
        bars[k].style.height = `${arr[k]}px`;
        j++;
      }
      bars[k].style.background = "linear-gradient(to top, #00f2fe, #4facfe)";
      k++;
    }
  
    while (i < left.length) {
      arr[k] = left[i];
      bars[k].style.height = `${arr[k]}px`;
      i++; k++;
      await sleep(50);
    }
  
    while (j < right.length) {
      arr[k] = right[j];
      bars[k].style.height = `${arr[k]}px`;
      j++; k++;
      await sleep(50);
    }
  }
  function quickSortWrapper() {
    quickSort(array, 0, array.length - 1);
  }
  async function quickSort(arr, low, high) {
    if (low < high) {
      let pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  }
  
  async function partition(arr, low, high) {
    let bars = document.getElementsByClassName("bar");
    let pivot = arr[high];
    let i = low - 1;
  
    for (let j = low; j < high; j++) {
      bars[j].style.background = "yellow";
      await sleep(50);
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        bars[i].style.height = `${arr[i]}px`;
        bars[j].style.height = `${arr[j]}px`;
      }
      bars[j].style.background = "linear-gradient(to top, #00f2fe, #4facfe)";
    }
  
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    bars[i + 1].style.height = `${arr[i + 1]}px`;
    bars[high].style.height = `${arr[high]}px`;
    return i + 1;
  }
          
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Initial array
generateArray(50);
