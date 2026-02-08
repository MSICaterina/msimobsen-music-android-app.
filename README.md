# Msimobsen Music Android App

This is a native Android application that displays a marker on a Google Map.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Android Studio
*   An Android Virtual Device (AVD) or a physical Android device
*   A Google Maps API Key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/MSICaterina/msimobsen-music-android-app.git
    ```

2.  **Create a `secrets.properties` file:**
    In the root directory of the project, create a file named `secrets.properties` and add the following lines:
    ```
    KEYSTORE_PASSWORD=todayisSundayfunday
    KEY_PASSWORD=todayisSundayfunday
    MAPS_API_KEY="YOUR_API_KEY"
    ```
    Replace `"YOUR_API_KEY"` with your actual Google Maps API key.

## Running the tests

To run the unit tests, execute the following command in the terminal:

```bash
gradle-8.4/bin/gradle -p app test
```

## Running the app

1.  **Install the app:**
    Make sure you have a running emulator or a connected device. Then, run the following command to install the app:
    ```bash
    gradle-8.4/bin/gradle -p app installDebug
    ```

2.  **Launch the app:**
    Run the following command to start the app:
    ```bash
    adb shell am start -n com.msimobsenmusic/com.msimobsenmusic.MapsMarkerActivity
    ```
