export type Language = {
  id: string
  name: string
  icon: string
  judgeId: number
  fileName: string
  defaultCode: string
}

export const LANGUAGES: Language[] = [
  {
    id: 'php',
    name: 'PHP',
    icon: '🐘',
    judgeId: 68,
    fileName: 'main.php',
    defaultCode: `<?php

$message = "Hello, World!";
echo $message . "\n";

// Ejemplo con arrays y bucles
$numbers = [1, 2, 3, 4, 5];
$sum = array_sum($numbers);
echo "La suma de los números es: $sum\n";

// Función simple
function greet(string $name): string {
    return "Hola, $name!";
}

echo greet("Code Playground") . "\n";
`
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '🟨',
    judgeId: 63,
    fileName: 'main.js',
    defaultCode: `// Hello, World!
console.log('Hello, World!');

// Arrays y funciones
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((a, b) => a + b, 0);
console.log('La suma es:', sum);

function greet(name) {
  return 'Hola, ' + name + '!';
}

console.log(greet('Code Playground'));
`
  },
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    judgeId: 71,
    fileName: 'main.py',
    defaultCode: `# Hello, World!
print('Hello, World!')

# Listas y funciones
numbers = [1, 2, 3, 4, 5]
total = sum(numbers)
print(f'La suma es: {total}')

def greet(name: str) -> str:
    return f'Hola, {name}!'

print(greet('Code Playground'))
`
  },
  {
    id: 'java',
    name: 'Java',
    icon: '☕',
    judgeId: 62,
    fileName: 'Main.java',
    defaultCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");

        int[] numbers = {1, 2, 3, 4, 5};
        int sum = 0;
        for (int n : numbers) sum += n;
        System.out.println("La suma es: " + sum);

        System.out.println(greet("Code Playground"));
    }

    static String greet(String name) {
        return "Hola, " + name + "!";
    }
}
`
  },
  {
    id: 'cpp',
    name: 'C++',
    icon: '⚙️',
    judgeId: 54,
    fileName: 'main.cpp',
    defaultCode: `#include <iostream>
#include <vector>
#include <numeric>
#include <string>
using namespace std;

string greet(const string& name) {
    return "Hola, " + name + "!";
}

int main() {
    cout << "Hello, World!" << endl;

    vector<int> numbers = {1, 2, 3, 4, 5};
    int sum = accumulate(numbers.begin(), numbers.end(), 0);
    cout << "La suma es: " << sum << endl;

    cout << greet("Code Playground") << endl;
    return 0;
}
`
  },
  {
    id: 'rust',
    name: 'Rust',
    icon: '🦀',
    judgeId: 73,
    fileName: 'main.rs',
    defaultCode: `fn greet(name: &str) -> String {
    format!("Hola, {}!", name)
}

fn main() {
    println!("Hello, World!");

    let numbers = vec![1, 2, 3, 4, 5];
    let sum: i32 = numbers.iter().sum();
    println!("La suma es: {}", sum);

    println!("{}", greet("Code Playground"));
}
`
  }
]
