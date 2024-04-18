#include <iostream>
#include <cstdlib>
#include <ctime>
#include <conio.h>
#include <windows.h>

using namespace std;

const int width = 50;
const int height = 20;
const char playerChar = '^';
const char enemyChar = 'V';
const char spaceChar = ' ';

int playerX = width / 2;
int playerY = height - 2;
int enemyX = 0;
int enemyY = 0;
bool gameOver = false;
int score = 0;

void clearScreen() {
    system("cls");
}

void setColor(int color) {
    SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), color);
}

void draw() {
    clearScreen();
    setColor(9);

    for (int i = 0; i < width + 2; i++) {
        cout << "#";
    }
    cout << endl;

    for (int i = 0; i < height; i++) {
        for (int j = 0; j < width; j++) {
            if (i == 0 || i == height - 1 || j == 0 || j == width - 1) {
                setColor(15); 
                cout << "#";
                setColor(9); 
            } else if (j == playerX && i == playerY) {
                setColor(10); 
                cout << playerChar;
                setColor(9); 
            } else if (j == enemyX && i == enemyY) {
                setColor(12);
                cout << enemyChar;
                setColor(9); 
            } else {
                cout << spaceChar;
            }
        }
        cout << endl;
    }

    for (int i = 0; i < width + 2; i++) {
        cout << "#";
    }
    cout << endl;

    cout << "Score: " << score << endl;
}

void input() {
    if (_kbhit()) {
        switch (_getch()) {
            case 'a':
                playerX--;
                break;
            case 'd':
                playerX++;
                break;
            case 'q':
                gameOver = true;
                break;
        }
    }
}

void logic() {
    enemyY++;
    if (enemyY >= height) {
        enemyX = rand() % (width - 2) + 1;
        enemyY = 0;
        score++;
    }

    if (playerX == enemyX && playerY == enemyY) {
        gameOver = true;
    }
}

int main() {
    srand(time(0));

    cout << "Welcome to the Star Wars Game!" << endl;
    cout << "Controls: Use 'a' to move left, 'd' to move right, and 'q' to quit." << endl;

    while (!gameOver) {
        draw();
        input();
        logic();
        Sleep(50);
    }

    setColor(12);
    cout << "Game Over! Your final score: " << score << endl;
    setColor(7); 
    return 0;
}
