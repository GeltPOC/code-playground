export type Language = {
  id: string
  name: string
  icon: string
  /** Nombre del runtime en Piston API (https://emkc.org/api/v2/piston/runtimes) */
  pistonLanguage: string
  /** Versión del runtime. '*' = última disponible */
  pistonVersion: string
  fileName: string
  defaultCode: string
}

export const LANGUAGES: Language[] = [
  {
    id: 'php',
    name: 'PHP',
    icon: '🐘',
    pistonLanguage: 'php',
    pistonVersion: '*',
    fileName: 'main.php',
    defaultCode: `<?php

$message = "Hello, World!";
echo $message . "\\n";

// Ejemplo con arrays y bucles
$numbers = [1, 2, 3, 4, 5];
$sum = array_sum($numbers);
echo "La suma de los números es: $sum\\n";

// Función simple
function greet(string $name): string {
    return "Hola, $name!";
}

echo greet("Code Playground") . "\\n";
`
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '🟨',
    pistonLanguage: 'javascript',
    pistonVersion: '*',
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
    pistonLanguage: 'python',
    pistonVersion: '*',
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
    pistonLanguage: 'java',
    pistonVersion: '*',
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
    pistonLanguage: 'c++',
    pistonVersion: '*',
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
    pistonLanguage: 'rust',
    pistonVersion: '*',
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
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: '🔷',
    pistonLanguage: 'typescript',
    pistonVersion: '*',
    fileName: 'main.ts',
    defaultCode: `// Hello, World!
console.log('Hello, World!');

const numbers: number[] = [1, 2, 3, 4, 5];
const sum: number = numbers.reduce((a, b) => a + b, 0);
console.log('La suma es:', sum);

function greet(name: string): string {
  return \`Hola, \${name}!\`;
}

console.log(greet('Code Playground'));
`
  },
  {
    id: 'go',
    name: 'Go',
    icon: '🐹',
    pistonLanguage: 'go',
    pistonVersion: '*',
    fileName: 'main.go',
    defaultCode: `package main

import "fmt"

func greet(name string) string {
	return "Hola, " + name + "!"
}

func main() {
	fmt.Println("Hello, World!")

	numbers := []int{1, 2, 3, 4, 5}
	sum := 0
	for _, n := range numbers {
		sum += n
	}
	fmt.Println("La suma es:", sum)

	fmt.Println(greet("Code Playground"))
}
`
  },
  {
    id: 'bash',
    name: 'Bash',
    icon: '🖥️',
    pistonLanguage: 'bash',
    pistonVersion: '*',
    fileName: 'main.sh',
    defaultCode: `#!/bin/bash

echo "Hello, World!"

numbers=(1 2 3 4 5)
sum=0
for n in "\${numbers[@]}"; do
  sum=$((sum + n))
done
echo "La suma es: $sum"

greet() {
  echo "Hola, $1!"
}

greet "Code Playground"
`
  }
]
