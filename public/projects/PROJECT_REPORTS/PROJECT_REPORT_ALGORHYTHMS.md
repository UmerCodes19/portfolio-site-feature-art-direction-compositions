Bahria University,
Karachi Campus

COURSE: CSC-221 DATA STRUCTURES AND
ALGORITHM
TERM: FALL 2024, CLASS: BSE- 3 (A)

PROJECT NAME

 Engr. Dr Sohaib/ Engr. Saniya Sarim

    Signed

Remarks:

               Score:

Table of Contents:

INTRODUCTION & PROBLEM - 3

PARADIGMS - 3

ALGORITHM & EXPLANATION -3

ALGORITHM CODE - 4

INTERFACES - 34

CONCLUSION - 36

1.  INTRODUCTION & PROBLEM

The project "algorythms" is a Windows Presentation Foundation (WPF)-based
simulator designed to visually demonstrate various Data Structures and Algorithms
(DSA) concepts. The motivation for this project stems from the challenges students
face in understanding abstract DSA concepts through traditional methods. By
providing an interactive and visually engaging environment, this simulator makes
learning DSA intuitive and enjoyable.

Problem Statement:
Students often struggle with grasping the dynamic and logical flow of algorithms
due to a lack of visual representation. This project aims to bridge the gap by
creating a simulator that provides real-time, step-by-step visualizations of selected
DSA topics.

2.  PARADIGMS

The development of "algorythms" adheres to the following paradigms:

1.  Interactive Learning: Engaging users through interactive visualizations to

reinforce understanding.

2.  Problem-Solving Approach: Focusing on real-world problems and presenting

intuitive solutions using algorithms.

3.  Gamification: Incorporating gaming elements to enhance user interest and

retention.

3.  ALGORITHM AND EXPLANATION

1. Sorting Algorithms

Objective: Visualize the sorting process step-by-step.
Features:

  Users can input numbers and create visual boxes, select a sorting algorithm, and

watch the numbers get sorted dynamically.

  Algorithms include Bubble Sort, Quick Sort, Merge Sort, etc.

  Each step of the sorting process is animated for clarity.

2. Travelling Salesman Problem (TSP)

Objective: Simulate the shortest path problem in a visual manner.
Features:

  Nodes represent cities; edges represent distances.

  Users can add cities, define distances, and set the starting city.

  The simulation animates a salesman traveling along the shortest path back to the

start, simplifying complex graph problems.

3. Binary Search Tree (BST) Game

Objective: Enhance BST learning through a two-player guessing game.
Features:

  A random binary tree is generated with three hidden values.

  Players guess hidden values using BST traversal rules.

  Player with the most correct guesses wins.

4. Linked List Snake

Objective: Combine the classic Snake game with linked list concepts.
Features:

  The snake represents a linked list where each food eaten adds a node.

  Each new node connects dynamically to form the snake’s body, making it an

educational twist to a popular game.

4.  ALGORITHM CODE

The code for all respective interfaces is as follows:

  Dashboard:

MainWindow.xaml.cs:

using System;

using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Effects;
using System.Windows.Media.Imaging;
using System.Windows.Media.Media3D;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace algorhythms___a_DSA_simulator
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private TranslateTransform translateTransform;
        private TranslateTransform comboBoxTranslateTransform;
        private TranslateTransform simulateButtonTranslateTransform;

        public MainWindow()
        {
            InitializeComponent();
            UpdateSubSimulationOptions();

            // Set initial opacity to 0 for fade-in effect
            Loaded += (s, e) =>
            {
                Opacity = 0;
                  FadeInWindow(this);

            };

        }

        // Reusable fade-in animation

        private void Logo_Loaded(object sender, RoutedEventArgs e)
        {
            ApplyDynamicGlowEffect();
            // Apply cool effect to ComboBoxes with subtle differences
            ApplyCoolEffect(MainSimulationComboBox);
            ApplyCoolEffect(SubSimulationComboBox);

            // Apply different effects for Simulate Button
            ApplyCoolEffect(SimulateButton);
        }

        private void MainSimulationComboBox_MouseEnter(object sender, MouseEventArgs e)
        {
            ApplyHoverGlowEffect(MainSimulationComboBox);
        }

        private void SubSimulationComboBox_MouseEnter(object sender, MouseEventArgs e)
        {
            ApplyHoverGlowEffect(SubSimulationComboBox);

        }

        private void SimulateButton_MouseEnter(object sender, MouseEventArgs e)
        {
            ApplyHoverGlowEffect(SimulateButton);
        }

        private void ApplyHoverGlowEffect(UIElement element)
        {
            var glowEffect = new DropShadowEffect
            {
                BlurRadius = 15,
                ShadowDepth = 0,
                Color = Colors.LightBlue,
                Opacity = 0.7
            };

            element.Effect = glowEffect;

            // Optional: Add a subtle scaling effect
            var scaleTransform = new ScaleTransform(1.0, 1.0);
            element.RenderTransform = scaleTransform;

            var scaleAnimation = new DoubleAnimation
            {
                From = 1.0,
                To = 1.05, // Slightly grow
                Duration = TimeSpan.FromSeconds(0.3),
                AutoReverse = true
            };

            scaleTransform.BeginAnimation(ScaleTransform.ScaleXProperty, scaleAnimation);
            scaleTransform.BeginAnimation(ScaleTransform.ScaleYProperty, scaleAnimation);
        }

        private void Border_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            if (e.ChangedButton == MouseButton.Left)
            {
                DragMove();
            }
        }

        private void SimulateButton_Click(object sender, RoutedEventArgs e)
        {
            var mainSelection = MainSimulationComboBox.SelectedItem as ComboBoxItem;
            if (mainSelection == null)
            {
                MessageBox.Show("Please select a main simulation type.");
                return;
            }

            string subSelection = SubSimulationComboBox.SelectedItem as string;
            if (string.IsNullOrEmpty(subSelection))
            {
                MessageBox.Show("Please select a sub-option.");
                return;
            }

            MessageBox.Show($"Main Selection: {mainSelection.Content.ToString()}\nSub Selection: {subSelection}");

            // Open respective window based on selection
            Window newWindow = null;

            if (mainSelection.Content.ToString() == "Sorting Algorithms")
            {

                SortingAlgorithms sortingWindow = new SortingAlgorithms();
                if (subSelection == "Bubble Sort")
                    sortingWindow.AlgorithmComboBox.SelectedIndex = 1;
                else if (subSelection == "Selection Sort")
                    sortingWindow.AlgorithmComboBox.SelectedIndex = 2;
                else if (subSelection == "Insertion Sort")
                    sortingWindow.AlgorithmComboBox.SelectedIndex = 3;
                else if (subSelection == "Quick Sort")
                    sortingWindow.AlgorithmComboBox.SelectedIndex = 4;

                newWindow = sortingWindow;
            }
            else if (mainSelection.Content.ToString() == "Graph Simulations")
            {
                if (subSelection == "Travelling Salesman Problem")
                    newWindow = new TravellingSalesmanProblem();
                else if (subSelection == "Dijkstras Algorithm")
                    newWindow = null;
            }
            else if (mainSelection.Content.ToString() == "Linked List Simulations")
            {
                if (subSelection == "Linked List Snake")
                    newWindow = new LinkedListSnake();
            }
            else if (mainSelection.Content.ToString() == "Tree Simulations")
            {
                if (subSelection == "Binary Tree Search Game")
                    newWindow = new BinarySearchTreeGame();
            }

            // Show the new window with fade-in effect and hide the current one
            if (newWindow != null)
            {
                // Fade out current window (optional)

                    this.Hide(); // Hide the current window

                    // Show new window
                    newWindow.Show();

                    // Apply fade-in effect to the new window
                    DoubleAnimation fadeInAnimation = new DoubleAnimation(0, 1, TimeSpan.FromSeconds(0.5));
                    newWindow.BeginAnimation(Window.OpacityProperty, fadeInAnimation);

            }
            else
            {
                MessageBox.Show("The selected simulation is not implemented yet.");
            }
        }

…………

    }
}

  Sorting Algorithms:

SortingAlgorithms.xaml.cs:
 using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Effects;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace algorhythms___a_DSA_simulator
{
    /// <summary>
    /// Interaction logic for SortingAlgorithms.xaml
    /// </summary>
    public partial class SortingAlgorithms : Window
    {
        SortingAlgorithm selectedAlgorithm = SortingAlgorithm.BubbleSort; // Example: Change this to select other algorithms
        private double animationSpeed = 500;
        private bool isSorted = false;  // Flag to check if the rectangles are sorted

        public enum SortingAlgorithm
        {
            BubbleSort,
            SelectionSort,
            InsertionSort,
            QuickSort
        }

        public SortingAlgorithms()
        {
            InitializeComponent();
            Storyboard glowingAnimation = (Storyboard)FindResource("GlowingAnimation");
            Storyboard.SetTarget(glowingAnimation, SortingHeading);
            glowingAnimation.Begin();

            Loaded += (s, e) =>
            {
                Opacity = 0;

                    MainWindow.FadeInWindow(this);

            };

            // Apply the fade-out animation when the window is closing

        }

        private async void SortButton_Click(object sender, RoutedEventArgs e)
        {
            // Get all grids on the canvas
            List<Grid> grids = ShelveCanvas.Children.OfType<Grid>().ToList();
            int n = grids.Count;

            // Debug: Show current list before sorting
            //DebugListState(grids, "Before sorting:");

            // If the list is already sorted, do nothing
            if (isSorted)
            {
              steps.AppendText("\nThe list is already sorted.");
                return;
            }

            // Sorting logic based on the selected algorithm

            switch (selectedAlgorithm)
            {
                case SortingAlgorithm.BubbleSort:
                    await BubbleSort(grids, n);
                    break;
                case SortingAlgorithm.SelectionSort:
                    await SelectionSort(grids, n);
                    break;
                case SortingAlgorithm.InsertionSort:
                    await InsertionSort(grids, n);
                    break;
                case SortingAlgorithm.QuickSort:
                    await QuickSort(grids, 0, n - 1);
                    break;
                default:
                    MessageBox.Show("Algorithm not implemented.");
                    break;
            }

            // After sorting, reorder the canvas and set the flag to true
            isSorted = true;
            ReorderCanvasItems(grids); // Ensure the canvas reflects the sorted order visually

            // Debug: Show list after sorting
            //DebugListState(grids, "After sorting:");
        }

        private async Task BubbleSort(List<Grid> grids, int n)
        {
            for (int i = 0; i < n - 1; i++)
            {
                for (int j = 0; j < n - i - 1; j++)
                {
                    var grid1 = grids[j];
                    var grid2 = grids[j + 1];
                    await HighlightGrid(grid1, Brushes.Yellow); // Highlight first grid in the comparison
                    await HighlightGrid(grid2, Brushes.Yellow); // Highlight second grid in the comparison

                    if (GetRectangleValue(grid1) > GetRectangleValue(grid2))
                    {
                        await SwapRectanglesWithStoryboard(grids, j, j + 1);
                        await HighlightGrid(grid1, Brushes.Red); // Highlight grid being swapped
                        await HighlightGrid(grid2, Brushes.Red); // Highlight grid being swapped
                    }
                    await Task.Delay(500); // Delay for visualization
                }
            }
        }

        private async Task SelectionSort(List<Grid> grids, int n)
        {
            for (int i = 0; i < n - 1; i++)
            {
                int minIndex = i;
                var minGrid = grids[minIndex];

                // Show message box for starting state of the outer loop (i)
                MessageBox.Show($"Pass {i + 1}: Starting with minIndex = {minIndex} and value = {GetRectangleValue(minGrid)}");

                await HighlightGrid(minGrid, Brushes.Green); // Highlight the current minimum element

                bool isSwapped = false;  // Track if any swap happens in this pass

                for (int j = i + 1; j < n; j++)
                {

                    var currentGrid = grids[j];

                    // Show message box for comparison values

                    // Highlight the current grid being compared
                    await HighlightGrid(currentGrid, Brushes.Yellow);

                    // Show comparison text before comparison happens

                    // Comparison happens here
                    if (GetRectangleValue(currentGrid) < GetRectangleValue(minGrid))
                    {
                        // Show message box for new minimum found

                        // Update min index and grid
                        minIndex = j;
                        minGrid = currentGrid;

                        // Highlight the new minimum element
                        await HighlightGrid(minGrid, Brushes.Green);
                        isSwapped = true;  // Mark that a swap will happen
                    }

                    await Task.Delay(300); // Short delay for comparison visualization

                    // After each comparison, remove the highlight from the current grid being compared
                    await HighlightGrid(currentGrid, Brushes.Transparent);
                }

                // Show message box if a swap will happen or not
                if (minIndex != i)
                {

                    // Swap the elements if needed
                    await SwapRectanglesWithStoryboard(grids, i, minIndex);

                    // Highlight swapped elements
                    await HighlightGrid(minGrid, Brushes.Red); // Highlight grid being swapped
                    await HighlightGrid(grids[i], Brushes.Red); // Highlight grid being swapped
                    isSwapped = true;  // A swap has occurred
                }
                else
                {
                    // Show message box if no swap was needed
                }

                // If no swaps were made, stop further processing
                if (!isSwapped)
                {
                     // Array is already sorted, exit the loop
                }

                await Task.Delay(500); // Delay after each pass for visualization
            }

            // Ensure that after the sorting is done, all elements are at their correct positions without any further animation
            for (int i = 0; i < n; i++)
            {
                var grid = grids[i];
                // Make sure to reset the Canvas.Left property to its final position if necessary
                Canvas.SetLeft(grid, i * 100); // This assumes the grid is spaced by 50 units, adjust as needed
            }
        }

        private async Task InsertionSort(List<Grid> grids, int n)
        {
            for (int i = 1; i < n; i++)
            {
                var currentGrid = grids[i];
                await HighlightGrid(currentGrid, Brushes.Yellow); // Highlight the current element

                int j = i;
                while (j > 0 && GetRectangleValue(grids[j]) < GetRectangleValue(grids[j - 1]))
                {
                    await SwapRectanglesWithStoryboard(grids, j, j - 1);
                    await HighlightGrid(grids[j - 1], Brushes.Red); // Highlight grid being moved

                    j--;
                }
                await Task.Delay(500); // Delay for visualization
            }
        }

        private async Task QuickSort(List<Grid> grids, int low, int high)
        {
            if (low < high)
            {
                int pivotIndex = await Partition(grids, low, high);
                await QuickSort(grids, low, pivotIndex - 1);
                await QuickSort(grids, pivotIndex + 1, high);
            }
        }

        private async Task<int> Partition(List<Grid> grids, int low, int high)
        {
            var pivotGrid = grids[high]; // Pivot element
            int pivotValue = GetRectangleValue(pivotGrid);

            // Highlight the pivot element by calling HighlightPivot
            await HighlightGrid(pivotGrid, Brushes.Blue);
            UpdateSteps($"\nPivot chosen: {pivotValue}");
            int i = (low - 1);

            for (int j = low; j < high; j++)
            {
                var currentGrid = grids[j];
               UpdateSteps($"\nComparing {GetRectangleValue(currentGrid)} with pivot {pivotValue}");
                await HighlightGrid(currentGrid, Brushes.Yellow); // Highlight comparison

                if (GetRectangleValue(grids[j]) < pivotValue)
                {
                    i++;
                    UpdateSteps($"\nSwapping {GetRectangleValue(grids[i])} and {GetRectangleValue(currentGrid)}");
                    await HighlightGrid(grids[i], Brushes.Red); // Highlight swapping
                    await HighlightGrid(currentGrid, Brushes.Red);
                    await SwapRectanglesWithStoryboard(grids, i, j);
                }
            }

            UpdateSteps($"\nSwapping {GetRectangleValue(grids[i + 1])} with pivot {pivotValue}");
            await HighlightGrid(grids[i + 1], Brushes.Red); // Highlight final swap
            await HighlightGrid(pivotGrid, Brushes.Red);
            await SwapRectanglesWithStoryboard(grids, i + 1, high);
            return i + 1;
        }

……..

    }

}

  TSP:

TravelingSalesmanProblem.xaml.cs:
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Effects;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace algorhythms___a_DSA_simulator
{
    /// <summary>
    /// Interaction logic for TravellingSalesmanProblem.xaml
    /// </summary>
    public partial class TravellingSalesmanProblem : Window
    {
        private Polygon startCity = null;  // Holds the start city for traversal
        private Dictionary<Polygon, string> cityNames = new Dictionary<Polygon, string>(); // Store city names for reference
        private List<Polygon> cities = new List<Polygon>(); // Store cities for easy reference

        private bool isAddEdges = false;  // Flag to check if Add Edges mode is enabled
        private Point _mouseStartPoint;
        private Dictionary<Polygon, List<Line>> cityEdges = new Dictionary<Polygon, List<Line>>();
        // List to store the edges

        private bool isAddStartMode = false; // Flag to track the mode

        public TravellingSalesmanProblem()
        {
            InitializeComponent();
            InitializeNodes();
            Storyboard glowingAnimation = (Storyboard)FindResource("GlowingAnimation");
            Storyboard.SetTarget(glowingAnimation, TSPHeading);
            glowingAnimation.Begin();
            // Initialize node colors

            Loaded += (s, e) =>
            {
                Opacity = 0;

                    MainWindow.FadeInWindow(this);

            };

        }

        private void Minimize_button_Click(object sender, RoutedEventArgs e)
        {
            this.WindowState = WindowState.Minimized;
        }

        // Maximize button event
        private void Maximize_button_Click(object sender, RoutedEventArgs e)

        {
            if (this.WindowState == WindowState.Maximized)
            {
                this.WindowState = WindowState.Normal;
            }
            else
            {
                this.WindowState = WindowState.Maximized;
            }
        }

        // Close button event
        private void CloseButton_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }

        // Back button event
        private void BackButton_Click(object sender, RoutedEventArgs e)
        {
            // Logic for the back button, for now we will just close the window
            DoubleAnimation fadeOutAnimation = new DoubleAnimation(0, TimeSpan.FromSeconds(0.5));
            fadeOutAnimation.Completed += (s, a) =>
            {
                Application.Current.MainWindow.Show();
                this.Close();
            };
            this.BeginAnimation(Window.OpacityProperty, fadeOutAnimation);
        }

        // Draggable window (custom title bar)
        private void Border_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            if (e.ButtonState == MouseButtonState.Pressed)
                this.DragMove();
        }

        private void InputNumberTextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            // Handle the logic when the user inputs a number
            // You can add validation or logic to store the input number for further use
        }
        private void ClearButton_Click(object sender, RoutedEventArgs e)
        {
            // Clear the input and reset the UI
            CityTextBox.Clear();
            CityMap.Children.Clear();
            ShortestPathTextBox.Clear();
            // Clear all data structures
            edges.Clear();
            cityEdges.Clear();
            _mouseStartPoint = new Point();
            cityNames.Clear();
           startCity = null;  // Holds the start city for traversal
         isAddStartMode = false; // Flag to track the mode
            cities.Clear();

        // Reset any other UI elements if necessary, like clearing the city list or map
    }

        private void ShowEdgeOptions(Edge edge)
        {
            // Remove existing options
            ClearEdgeOptions();

            // Get position of the weight label
            double x = Canvas.GetLeft(edge.WeightLabel);

            double y = Canvas.GetTop(edge.WeightLabel);

            // Create "Increase Weight" button
            var increaseWeightButton = new Button
            {
                Content = "➕",
                Width = 30,
                Height = 30,
                Background = Brushes.LightGreen
            };
            Canvas.SetLeft(increaseWeightButton, x + 50);
            Canvas.SetTop(increaseWeightButton, y);
            increaseWeightButton.Click += (s, e) =>
            {
                // Open input prompt for weight
                var weightInput = Microsoft.VisualBasic.Interaction.InputBox("Enter the new weight for the edge:", "Enter Weight",
edge.Weight.ToString());

                // Check if the input is a valid number
                if (int.TryParse(weightInput, out int newWeight))
                {
                    edge.Weight = newWeight;
                    edge.WeightLabel.Text = edge.Weight.ToString();
                }
                else
                {
                    MessageBox.Show("Please enter a valid integer weight.");
                }

                ClearEdgeOptions();
            };

            // Add MouseEnter and MouseLeave event to pulsate green when hovered
            increaseWeightButton.MouseEnter += (s, e) => StartPulsatingAnimation(edge.Line, Colors.Green);
            increaseWeightButton.MouseLeave += (s, e) => StopPulsatingAnimation(edge.Line);

            // Create "Remove Edge" button
            var removeEdgeButton = new Button
            {

                Content = "❌",
                Width = 30,
                Height = 30,
                Background = Brushes.Red
            };
            Canvas.SetLeft(removeEdgeButton, x - 50);
            Canvas.SetTop(removeEdgeButton, y);
            removeEdgeButton.Click += (s, e) =>
            {
                RemoveEdge(edge);
                ClearEdgeOptions();
            };

            // Add MouseEnter and MouseLeave event to pulsate red when hovered
            removeEdgeButton.MouseEnter += (s, e) => StartPulsatingAnimation(edge.Line, Colors.Red);
            removeEdgeButton.MouseLeave += (s, e) => StopPulsatingAnimation(edge.Line);

            // Add buttons to the canvas
            CityMap.Children.Add(increaseWeightButton);
            CityMap.Children.Add(removeEdgeButton);
        }

        private void StartPulsatingAnimation(Line edge, Color color)
        {
            var storyboard = new Storyboard();

            // Create a color animation for the stroke of the edge

            var colorAnimation = new ColorAnimation
            {
                From = color,
                To = Colors.Transparent, // Fade out effect
                Duration = TimeSpan.FromSeconds(0.5),
                AutoReverse = true,
                RepeatBehavior = RepeatBehavior.Forever
            };

            // Apply animation to the edge stroke
            var strokeBrush = new SolidColorBrush(color); // Starting color
            edge.Stroke = strokeBrush;

            Storyboard.SetTarget(colorAnimation, strokeBrush);
            Storyboard.SetTargetProperty(colorAnimation, new PropertyPath(SolidColorBrush.ColorProperty));

            storyboard.Children.Add(colorAnimation);
            storyboard.Begin();

            // Store the animation in the tag so it can be stopped later
            edge.Tag = storyboard;
        }

        private void StopPulsatingAnimation(Line edge)
        {
            if (edge.Tag is Storyboard storyboard)
            {
                storyboard.Stop(); // Stop the animation
                edge.Stroke = Brushes.White; // Reset stroke color
                edge.Tag = null;
            }
        }

        // Clear existing edge options
        private void ClearEdgeOptions()
        {
            var buttons = CityMap.Children.OfType<Button>().ToList();
            foreach (var button in buttons)
                CityMap.Children.Remove(button);
        }

        private void RemoveEdge(Edge edge)
        {
            // Remove the line and weight label from the canvas
            CityMap.Children.Remove(edge.Line);
            CityMap.Children.Remove(edge.WeightLabel);

            // Remove the edge from the list
            edges.Remove(edge);

            // Update cityEdges dictionary if necessary
            if (cityEdges.ContainsKey(edge.City1))
                cityEdges[edge.City1].Remove(edge.Line);
            if (cityEdges.ContainsKey(edge.City2))
                cityEdges[edge.City2].Remove(edge.Line);
        }

        // Toggle button checked event
        // Toggle button checked event
        private void AddEdgeToggleButton_Checked(object sender, RoutedEventArgs e)
        {
            isAddEdges = true; // Enable "Add Edges" mode when the toggle button is checked
            MessageBox.Show("Add edges mode is enabled. Click on a city to start and drag to another city.");
        }

        // Toggle button click event (used to toggle between the modes)

        private Polygon firstCity = null;
        private void RandomButtonClick(object sender, RoutedEventArgs e)
        {
            // Clear previous cities and edges
            CityMap.Children.Clear();
            edges.Clear();
            cityNames.Clear();
            cities.Clear();

            // Add cities (A-F)
            AddCity("A");
            AddCity("B");
            AddCity("C");
            AddCity("D");
            AddCity("E");
            AddCity("F");

            // Distance table
            int[,] distances = {
        { 0, 120, 90, 135, 100, 150 },
        { 120, 0, 85, 75, 120, 110 },
        { 90, 85, 0, 60, 85, 165 },
        { 135, 75, 60, 0, 155, 95 },
        { 100, 120, 85, 155, 0, 140 },
        { 150, 110, 165, 95, 140, 0 }
    };

            // Add edges
            for (int i = 0; i < cities.Count; i++)
            {
                for (int j = i + 1; j < cities.Count; j++)
                {
                    AddEdge(cities[i], cities[j], distances[i, j]);
                }
            }

            Debug.WriteLine($"Generated graph with {cities.Count} cities and {edges.Count} edges.");
        }

        private void City_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            var city = sender as Polygon;
            if (city != null)
            {

                // Start dragging
                _mouseStartPoint = e.GetPosition(CityMap);
                city.CaptureMouse();

                // Check if we're adding an edge
                if (isAddEdges)
                {
                    if (firstCity == null)
                    {
                        // First city selected for edge
                        firstCity = city;
                    }
                    else
                    {
                        // Second city selected, add edge between the two cities

                        AddEdge(firstCity, city,0);
                        firstCity = null; // Reset first city after adding edge
                    }
                }

                HighlightCity(city);

            }
        }

        private void WeightLabel_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            var weightLabel = sender as TextBlock;
            if (weightLabel != null)
            {
                // Find the edge associated with the clicked weight label
                var edge = edges.FirstOrDefault(edgeItem => edgeItem.WeightLabel == weightLabel);
                if (edge != null)
                {
                    ShowEdgeOptions(edge); // Display the option buttons
                }

                HighlightEdge(edge.Line);
            }
        }

        private void City_MouseMove(object sender, MouseEventArgs e)
        {
            if (_mouseStartPoint != null && e.LeftButton == MouseButtonState.Pressed)
            {
                var city = sender as Polygon;
                if (city != null && !isAddEdges) // Only allow dragging if "Add Edges" is not toggled
                {
                    var offset = e.GetPosition(CityMap) - _mouseStartPoint;
                    var newX = Canvas.GetLeft(city) + offset.X;
                    var newY = Canvas.GetTop(city) + offset.Y;

                    // Update the position of the polygon
                    Canvas.SetLeft(city, newX);
                    Canvas.SetTop(city, newY);

                    // Update the label position as well
                    var cityLabel = city.Tag as TextBlock;
                    if (cityLabel != null)
                    {
                        Canvas.SetLeft(cityLabel, newX + 50); // Update the label's position
                        Canvas.SetTop(cityLabel, newY + 50); // Slight offset to keep it centered
                    }

                    // Update the mouse start position for continuous movement
                    _mouseStartPoint = e.GetPosition(CityMap);

                    // Update all edges connected to the dragged city
                    foreach (var edge in edges)
                    {
                        if (edge.City1 == city || edge.City2 == city)
                        {
                            edge.UpdatePosition(); // Update the position of the edge
                        }
                    }
                }
            }
        }

        // Event for releasing the mouse button and stopping dragging
        private void City_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            var city = sender as Polygon;
            if (city != null)
            {

                // Release the mouse capture when the drag ends
                city.ReleaseMouseCapture();

                if (!isAddEdges && !isAddStartMode) // Reset colors only if not in Add Edges or Add Start mode
                {
                    ResetCityAppearance(city); // Reset the city color to its original
                    ResetEdgeAppearance(city); // Reset edges connected to the city
                }
                RemoveHighlight(city); // Remove the highlight after releasing
                ApplyFloatingAnimation(city);
            }
        }

        private void ResetCityAppearance(Polygon city)
        {
            // Create an ImageBrush to fill the polygon with an image
            ImageBrush cityImageBrush = new ImageBrush
            {
                ImageSource = new BitmapImage(new Uri("pack://application:,,,/algorhythms - a DSA simulator;component/map.png",
UriKind.Absolute)),
                Stretch = Stretch.Fill  // Stretch the image to fill the polygon area
            };

            // Apply the ImageBrush to the Fill of the polygon
            city.Fill = cityImageBrush;
        }

        private void ResetEdgeAppearance(Polygon city)
        {
            foreach (var edge in edges)
            {
                if (edge.City1 == city || edge.City2 == city)
                {
                    edge.Line.Stroke = new SolidColorBrush(Colors.White); // Default color for edges
                    if (edge.WeightLabel != null)
                    {
                        edge.WeightLabel.Foreground = new SolidColorBrush(Colors.White); // Default label color
                    }
                }
            }
        }

        // Method to add cities (represented as polygons) to the canvas at a random position
        private void AddCity(string cityName)
        {
            // Generate random X and Y coordinates for city placement
            Random rand = new Random();
            double x = rand.Next(50, (int)(CityMap.ActualWidth - 50));  // X position within canvas bounds
            double y = rand.Next(50, (int)(CityMap.ActualHeight - 50)); // Y position within canvas bounds

            Polygon city = new Polygon
            {
                Points = new PointCollection(new[] { new Point(0, 0), new Point(60, 0), new Point(60, 60), new Point(0, 60) }),

            };

            // Create an ImageBrush to fill the polygon with an image
            ImageBrush cityImageBrush = new ImageBrush
            {
                ImageSource = new BitmapImage(new Uri("pack://application:,,,/algorhythms - a DSA simulator;component/map.png",
UriKind.Absolute)), // Replace with your 3D box image path
                Stretch = Stretch.Fill  // Stretch the image to fill the polygon area
            };

            // Apply the ImageBrush to the Fill of the polygon
            city.Fill = cityImageBrush;

            bool isOverlapping;
            do
            {
                x = rand.Next(50, (int)(CityMap.ActualWidth - 50));
                y = rand.Next(50, (int)(CityMap.ActualHeight - 50));
                isOverlapping = cities.Any(cityy =>
                {
                    double cx = Canvas.GetLeft(city);
                    double cy = Canvas.GetTop(city);
                    return Math.Sqrt(Math.Pow(cx - x, 2) + Math.Pow(cy - y, 2)) < 50; // Minimum distance
                });
            } while (isOverlapping);

            // Set the position of the city on the canvas
            Canvas.SetLeft(city, x);
            Canvas.SetTop(city, y);

            // Create the city label (name)
            TextBlock cityLabel = new TextBlock
            {
                Text = cityName,
                FontSize = 18,
                Foreground = Brushes.White,
                FontWeight = FontWeights.Bold
            };

            // Place the city label near the city
            Canvas.SetLeft(cityLabel, x + 50);
            Canvas.SetTop(cityLabel, y + 50);

            // Add the city and label to the canvas
            CityMap.Children.Add(city);
            CityMap.Children.Add(cityLabel);

            // Attach event handlers for the city
            city.MouseLeftButtonDown += City_MouseLeftButtonDown;
            city.MouseMove += City_MouseMove;
            city.MouseLeftButtonUp += City_MouseLeftButtonUp;
            city.MouseLeftButtonDown += OnCityClick;

            // Store the city label with the city for easy reference
            ApplyFloatingAnimation(city);
            city.Tag = cityLabel;

            // **Store city in dictionary and list for easy access**

            cityNames.Add(city, cityName);  // Add the city to the dictionary
            cities.Add(city);
            // Add the city to the cities list for reliable access
        }
…………

  BST Game:

BinarySearchTreeGame.xaml.cs:
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Effects;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using System.Windows.Threading;
using static algorhythms___a_DSA_simulator.BinarySearchTreeGame;

namespace algorhythms___a_DSA_simulator
{
    /// <summary>
    /// Interaction logic for BinarySearchTreeGame.xaml
    /// </summary>
    public partial class BinarySearchTreeGame : Window
    {

        private static BinaryTree binaryTree;
        private int player1Score = 0;
        private int player2Score = 0;
        private int currentPlayer = 1;
        private int[] hiddenValues;
        private int guessIndex = 0;
        public String p1 = "";
        public String p2 = "";
        public BinarySearchTreeGame()
        {
            InitializeComponent();
            InitializeComponent();
            Storyboard glowingAnimation = (Storyboard)FindResource("GlowingAnimation");
            Storyboard.SetTarget(glowingAnimation, TSPHeading);
            GetPlayerNames();  // Ask for player names at the start
            InitializeTimer();
            InitializeGame();
            UpdateScores();

            Loaded += (s, e) =>
            {
                Opacity = 0;

                    MainWindow.FadeInWindow(this);

            };

            //Apply the fade -out animation when the window is closing

        }
        private void GetPlayerNames()
        {

                p1 = "Player 1";
                p2 = "Player 2";

        }

        private DispatcherTimer timer;
        private int timeLeft = 50; // 50 seconds for each turn

        private void InitializeTimer()
        {
            timer = new DispatcherTimer();
            timer.Interval = TimeSpan.FromSeconds(1);
            timer.Tick += Timer_Tick;
        }

        private void Timer_Tick(object sender, EventArgs e)
        {
            timeLeft--;
            Console.WriteLine($"Time left: {timeLeft}s"); // Debugging line
            TimerLabel.Content = $"Time left: {timeLeft}s";  // Display time on a Label
            if (timeLeft <= 0)
            {
                timer.Stop();
                EndTurn();  // Switch to the next player
            }
        }

        private void StartTurn()
        {
            timeLeft = 50;  // Reset timer for the new turn
            timer.Start();
        }

        private void GuessTextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
        }

        private void AddGlowEffectToWinner(TextBlock winnerTextBlock)
        {
            winnerTextBlock.Effect = new DropShadowEffect
            {
                Color = Colors.Gold,
                BlurRadius = 20,
                ShadowDepth = 0,
                Opacity = 0.9
            };
        }

        private void AnimateScoreUpdate(TextBlock scoreTextBlock, int oldScore, int newScore)
        {
            DoubleAnimation scoreAnimation = new DoubleAnimation
            {
                From = oldScore,
                To = newScore,
                Duration = TimeSpan.FromSeconds(0.5)
            };

            scoreTextBlock.BeginAnimation(TextBlock.OpacityProperty, scoreAnimation);
        }

        private void InitializeGame()
        {
            binaryTree = new BinaryTree();

            binaryTree.GenerateTree();
            hiddenValues = binaryTree.HideRandomValues();
            RenderTree();
            GameCanvas.SizeChanged += (s, e) => RenderTree();
            StartTurn();

        }

        private void RenderTree()
        {
            GameCanvas.Children.Clear();
            double canvasWidth = GameCanvas.ActualWidth;
            double canvasHeight = GameCanvas.ActualHeight;

            double rootX = canvasWidth / 2; // Center the root horizontally
            double rootY = 50;             // Top margin for the root node
            double initialOffset = canvasWidth / 4; // Starting horizontal spacing

            RenderNode(binaryTree.Root, rootX, rootY, initialOffset); // Use binaryTree.Root
        }

        private void RenderNode(TreeNode node, double x, double y, double offset)
        {
            if (node == null) return;

            // Floating animation effect for the tree node (circle)
            var nodeFloatAnimation = new DoubleAnimation
            {
                From = y - 10,  // Start position
                To = y + 0.2,    // End position
                Duration = TimeSpan.FromSeconds(1.5),
                AutoReverse = true,     // Move back and forth
                RepeatBehavior = RepeatBehavior.Forever
            };

            // Create a circle for the tree node
            Ellipse circle = new Ellipse
            {
                Width = 40,
                Height = 40,
                Fill = node.IsHidden ? Brushes.Red : Brushes.Green, // Red if hidden, Green if guessed
                Stroke = Brushes.Black,
                StrokeThickness = 2
            };

            // Apply floating animation to the node (circle)
            Storyboard.SetTarget(nodeFloatAnimation, circle);
            Storyboard.SetTargetProperty(nodeFloatAnimation, new PropertyPath("(Canvas.Top)"));
            Storyboard nodeStoryboard = new Storyboard();
            nodeStoryboard.Children.Add(nodeFloatAnimation);
            nodeStoryboard.Begin();

            // Add a glowing effect if the node is guessed
            if (!node.IsHidden)
            {
                circle.Effect = new DropShadowEffect
                {
                    Color = Colors.Green,
                    BlurRadius = 10,
                    ShadowDepth = 0,
                    Opacity = 0.8
                };
            }

            // Floating animation effect for the text block (same as for circle)
            var textFloatAnimation = new DoubleAnimation
            {
                From = y - 2,  // Start position
                To = y + 10.2,    // End position
                Duration = TimeSpan.FromSeconds(1.5),
                AutoReverse = true,     // Move back and forth
                RepeatBehavior = RepeatBehavior.Forever
            };

            // Text for the node
            TextBlock text = new TextBlock
            {
                Text = node.DisplayValue, // Use DisplayValue property
                FontSize = 16,
                Foreground = Brushes.Black,
                FontWeight = FontWeights.Bold,
                HorizontalAlignment = HorizontalAlignment.Center,
                VerticalAlignment = VerticalAlignment.Center
            };

            // Apply floating animation to the text block
            Storyboard.SetTarget(textFloatAnimation, text);
            Storyboard.SetTargetProperty(textFloatAnimation, new PropertyPath("(Canvas.Top)"));
            Storyboard textStoryboard = new Storyboard();
            textStoryboard.Children.Add(textFloatAnimation);
            textStoryboard.Begin();

            // Position the circle and text
            Canvas.SetLeft(circle, x - 20);
            Canvas.SetTop(circle, y - 20);
            Canvas.SetLeft(text, x - 10);
            Canvas.SetTop(text, y - 10);

            // Set ZIndex for node (higher to be on top of the lines)
            Panel.SetZIndex(circle, 1);
            Panel.SetZIndex(text, 2);

            GameCanvas.Children.Add(circle);
            GameCanvas.Children.Add(text);

            // Recursive rendering for child nodes
            if (node.Left != null)
            {
                Line leftLine = new Line
                {
                    X1 = x,
                    Y1 = y,
                    X2 = x - offset,
                    Y2 = y + 60,
                    Stroke = Brushes.White,
                    StrokeThickness = 1.5
                };

                // Set ZIndex for the line (lower so it stays behind the node)
                Panel.SetZIndex(leftLine, 0);
                GameCanvas.Children.Add(leftLine);
                RenderNode(node.Left, x - offset, y + 60, offset / 2);
            }

            if (node.Right != null)
            {
                Line rightLine = new Line
                {
                    X1 = x,
                    Y1 = y,
                    X2 = x + offset,

                    Y2 = y + 60,
                    Stroke = Brushes.White,
                    StrokeThickness = 1.5
                };

                // Set ZIndex for the line (lower so it stays behind the node)
                Panel.SetZIndex(rightLine, 0);
                GameCanvas.Children.Add(rightLine);
                RenderNode(node.Right, x + offset, y + 60, offset / 2);
            }
        }

        private void GuessButton_Click(object sender, RoutedEventArgs e)
        {
            if (!int.TryParse(GuessTextBox.Text, out int guess))
            {
                MessageBox.Show("Enter a valid number.");
                return;
            }

            // Provide feedback on closeness
            string feedback = GetFeedback(guess);
            MessageBox.Show(feedback);

            // Check if the guess is correct
            TreeNode guessedNode = FindNode(binaryTree.Root, guess);
            if (guessedNode == null || !hiddenValues.Contains(guess))
            {
                MessageBox.Show("Incorrect guess. Try again.");
                EndTurn(); // Switch player only after an incorrect guess
                return;
            }

            // Correct guess
            if (hiddenValues.Contains(guess))
            {
                // Player 1 or Player 2 score update
                if (currentPlayer == 1)
                {
                    player1Score++;
                    AnimateScoreUpdate(Player1Points, player1Score - 1, player1Score);
                }
                else
                {
                    player2Score++;
                    AnimateScoreUpdate(Player2Points, player2Score - 1, player2Score);
                }

                // Reveal the guessed node
                guessedNode.IsHidden = false;
                hiddenValues = hiddenValues.Where(v => v != guess).ToArray(); // Remove guessed value
                UpdateScores();
                RenderTree(); // Refresh tree display
            }

            // Check if all hidden values are guessed
            if (!hiddenValues.Any())
            {
                DisplayWinner(currentPlayer == 1 ? "Player 1" : "Player 2");
                PromptForRestart(); // Trigger restart prompt
                timer.Stop();
                return;
            }

            // Only switch player if the guess was incorrect
            // Removed EndTurn() here to prevent switching after correct guesses
        }

        // Helper to find a node by value.
        private TreeNode FindNode(TreeNode node, int value)
        {
            if (node == null) return null;
            if (node.Value == value) return node;

            return FindNode(node.Left, value) ?? FindNode(node.Right, value);
        }

        private void UpdateScores()
        {
            Player1Points.Text = $"{p1} Score : {player1Score}";
            Player2Points.Text = $"{p2} Score : {player2Score}";
        }
………………….

  Linked List Snake:

LinkedListSnake.xaml.cs:

using System;

using System.Collections.Generic;

using System.Diagnostics;

using System.Linq;

using System.Windows;

using System.Windows.Controls;

using System.Windows.Input;

using System.Windows.Media;

using System.Windows.Media.Animation;

using System.Windows.Media.Imaging;

using System.Windows.Shapes;

using System.Windows.Threading;

namespace algorhythms___a_DSA_simulator

{

    public partial class LinkedListSnake : Window

    {

        private LinkedList<SnekNode> snake = new LinkedList<SnekNode>();

        // A list to store the food labels

        private List<string> foodLabels = new List<string>();

        private int foodPointer = 0;  // Pointer to track the current food item

        private SnekNode foodNode;

        private DispatcherTimer gameTimer;

        private Point currentDirection = new Point(20, 0); // Initial direction: right

        private int score = 0;

        private Random random = new Random();

        private const int NodeSize = 70;

        public LinkedListSnake()

        {

            InitializeComponent();

            Storyboard glowingAnimation = (Storyboard)FindResource("GlowingAnimation");

            Storyboard.SetTarget(glowingAnimation, TSPHeading);

            glowingAnimation.Begin();

            Loaded += OnWindowLoaded;

            Loaded += (s, e) =>

            {

                Opacity = 0;

                    MainWindow.FadeInWindow(this);

            };

            //Apply the fade -out animation when the window is closing

        }

        protected override void OnClosed(EventArgs e)

        {

            base.OnClosed(e);

            // Stop and dispose of the timer

            if (gameTimer != null)

            {

                gameTimer.Stop();

                gameTimer.Tick -= GameLoop; // Detach event handlers

                gameTimer = null;

            }

            // Clear other resources

            snake.Clear();

            foodLabels.Clear();

        }

        private void OnWindowLoaded(object sender, RoutedEventArgs e)

        {

            InitializeGame();

            StartGame();

        }

        private bool isCollisionDetectionActive = false;

        // Enable collision detection after a delay

        private void InitializeGame()

        {

            isCollisionDetectionActive = false;

            DispatcherTimer delayTimer = new DispatcherTimer { Interval = TimeSpan.FromSeconds(1) };

            delayTimer.Tick += (s, e) =>

            {

                isCollisionDetectionActive = true;

                delayTimer.Stop();

            };

            delayTimer.Start();

            gameTimer = new DispatcherTimer

            {

                Interval = TimeSpan.FromMilliseconds(150)

            };

            gameTimer.Tick += GameLoop;

            DrawSnake();

            SpawnFood();

        }

        private void StartGame()

        {

            score = 0;

            PlayerPoints.Text = "Score: 0";

            gameTimer.Start();

        }

        private void DrawSnake()

        {

            snake.Clear();

            GameCanvas.Children.Clear(); // Clears canvas to avoid layering issues.

            var headNode = CreateNode("NULL", Brushes.Green); // Create snake head with the initial label "NULL".

            snake.AddFirst(headNode); // Adds the node to the linked list.

            // Adjust initial position based on canvas size

            Point initialPosition = new Point(GameCanvas.ActualWidth / 2, GameCanvas.ActualHeight / 2);

            PositionNode(headNode, initialPosition);

            GameCanvas.Children.Add(headNode.Visual); // Adds it to the canvas for rendering.

        }

        private void SpawnFood()

        {

            if (foodNode != null)

            {

                GameCanvas.Children.Remove(foodNode.Visual); // Remove old food from canvas

                GameCanvas.Children.Remove(foodNode.Label); // Remove old food label from canvas

            }

            foodNode = CreateNode(random.Next(1, 100).ToString(), Brushes.Red); // Create new food node

            PositionNode(foodNode, GenerateRandomPosition()); // Position the food node

            GameCanvas.Children.Add(foodNode.Visual); // Add food to canvas

            GameCanvas.Children.Add(foodNode.Label); // Add food label to canvas

        }

        private SnekNode CreateNode(string label, Brush color)

        {

            var node = new SnekNode(label, color);

            // Create an Image element for the node's visual

            node.Visual = new Image

            {

                Width = NodeSize,

                Height = NodeSize,

                Source = new BitmapImage(new Uri("pack://application:,,,/algorhythms - a DSA simulator;component/snake.png",
UriKind.Absolute)),// Path to snake image

                Stretch = Stretch.Uniform

            };

            // Initialize Label and Pointer TextBlock (optional)

            node.Label = new TextBlock

            {

                Text = label,

                FontSize = 16,

                Foreground = Brushes.Black,

                HorizontalAlignment = HorizontalAlignment.Center,

                VerticalAlignment = VerticalAlignment.Center

            };

            node.Pointer = new TextBlock

            {

                Text = "→", // Optional pointer

                Foreground = Brushes.Black,

                HorizontalAlignment = HorizontalAlignment.Center,

                VerticalAlignment = VerticalAlignment.Bottom

            };

            return node;

        }

        private void PositionNode(SnekNode node, Point position)

        {

            Canvas.SetLeft(node.Visual, position.X);

            Canvas.SetTop(node.Visual, position.Y);

            // Position the label in the center of the node

            Canvas.SetLeft(node.Label, position.X + NodeSize / 4);

            Canvas.SetTop(node.Label, position.Y + NodeSize / 4);

            // Position the pointer relative to the node size

            Canvas.SetLeft(node.Pointer, position.X + NodeSize / 2);

            Canvas.SetTop(node.Pointer, position.Y + NodeSize / 2);

        }

        private Point GenerateRandomPosition()

        {

            int maxX = (int)(GameCanvas.ActualWidth / NodeSize) * NodeSize;

            int maxY = (int)(GameCanvas.ActualHeight / NodeSize) * NodeSize;

            return new Point(random.Next(0, maxX / NodeSize) * NodeSize,

                             random.Next(0, maxY / NodeSize) * NodeSize);

        }

        private void GameLoop(object sender, EventArgs e)

        {

            MoveSnake();

            CheckCollision();

        }

        private void MoveSnake()

        {

            Point newHeadPos = new Point(

                Canvas.GetLeft(snake.First.Value.Visual) + currentDirection.X,

                Canvas.GetTop(snake.First.Value.Visual) + currentDirection.Y

            );

            DebugLog($"New head position: {newHeadPos}");

            var newHead = CreateNode(foodNode.Label.Text, Brushes.Green);

            PositionNode(newHead, newHeadPos);

            DebugLog($"Placed new head at: {newHeadPos}");

            snake.AddFirst(newHead);

            GameCanvas.Children.Add(newHead.Visual);

            GameCanvas.Children.Add(newHead.Label);

            GameCanvas.Children.Add(newHead.Pointer);

            if (HasEatenFood(newHead))

            {

                score++;

                PlayerPoints.Text = $"Score: {score}";

                SpawnFood();

            }

            else

            {

                var tail = snake.Last.Value;

                tail.Label.Text = "NULL"; // Set tail label to NULL

                GameCanvas.Children.Remove(tail.Visual);

                GameCanvas.Children.Remove(tail.Label);

                GameCanvas.Children.Remove(tail.Pointer);

                snake.RemoveLast();

            }

            UpdateNodeLabels();

        }

        private void UpdateNodeLabels()

        {

            // Traverse the snake's body and update labels.

            var currentNode = snake.First;

            int index = 0;  // This will keep track of the position in the snake (head -> tail)

            while (currentNode != null)

            {

                // Head node gets the food label if it ate food

                if (currentNode.Value == snake.First.Value)

                {

                    currentNode.Value.Label.Text = foodNode.Label.Text;  // Assign food label to the head

                }

                else

                {

                    // Other nodes retain their own label, e.g., "Node 0", "Node 1" based on their position

                    currentNode.Value.Label.Text = "Node " + (index + 1);  // Adjusted to 1-based indexing

                }

                if (currentNode.Next == null)

                {

                    currentNode.Value.Pointer.Text = "NULL"; // Tail node

                }

                else

                {

                    currentNode.Value.Pointer.Text = "➜"; // Mid nodes

                }

                // Move to the next node

                currentNode = currentNode.Next;

                index++;

            }

            // Debugging: Output updated snake labels

            DebugLog("Updated snake labels:");

            PrintSnakeLabels();  // Your method to print current labels for debugging purposes

        }

        private void PrintSnakeLabels()

        {

            // This method will print all labels of the snake's nodes for debugging

            var currentNode = snake.First;

            while (currentNode != null)

            {

                DebugLog($"Node at position ({Canvas.GetLeft(currentNode.Value.Visual)}, {Canvas.GetTop(currentNode.Value.Visual)}) has label:
{currentNode.Value.Label.Text}");

                currentNode = currentNode.Next;

            }

        }

5.  INTERFACES

Dashboard

Sorting Simulation

TSP Simulation

BST Game

Linked List Snake

6.  CONCLUSION

algorithms – a DSA Simulator effectively bridges the gap between theoretical DSA concepts and
practical understanding through interactive and engaging simulations. By providing real-time
visualizations and incorporating gaming elements, the simulator caters to diverse learning styles, making
DSA concepts accessible and enjoyable for students.

