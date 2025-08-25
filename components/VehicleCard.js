import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { Trash2 } from "lucide-react-native";
import VehicleIcon from "./VehicleIcon";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = -100;

export default function VehicleCard({ vehicle, index, onRemove }) {
  const translateX = useSharedValue(0);

  // 👇 Define Pan Gesture using new API
  const panGesture = Gesture.Pan()
    .onStart(() => {
      // nothing extra needed since translateX is already tracked
    })
    .onUpdate((event) => {
      // only allow left swipe
      if (event.translationX <= 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd((event) => {
      const shouldOpen = event.translationX < SWIPE_THRESHOLD;
      translateX.value = withSpring(shouldOpen ? SWIPE_THRESHOLD : 0, {
        damping: 20,
        stiffness: 150,
      });
    });

  // Animations
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const deleteButtonStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < -20 ? 1 : 0,
  }));

  const handleDelete = () => {
    translateX.value = withSpring(
      -SCREEN_WIDTH,
      {
        damping: 20,
        stiffness: 150,
      },
      () => {
        runOnJS(onRemove)();
      }
    );
  };

  const closeSwipe = () => {
    translateX.value = withSpring(0, {
      damping: 20,
      stiffness: 150,
    });
  };

  return (
    <View style={[styles.container, { marginTop: index * 4 }]}>
      {/* Delete Button */}
      <Animated.View style={[styles.deleteContainer, deleteButtonStyle]}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Trash2 size={24} color="#FFFFFF" />
          <Text style={styles.deleteText}>Xóa</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Card wrapped in GestureDetector */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={animatedStyle}>
          <Pressable style={styles.card} onPress={closeSwipe}>
            <View style={styles.leftSection}>
              <VehicleIcon type={vehicle.type} />
              <View style={styles.vehicleInfo}>
                <Text style={styles.plateNumber}>{vehicle.plate}</Text>
                <Text style={styles.vehicleType}>
                  {getVehicleTypeName(vehicle.type)}
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.checkButton}>
              <Text style={styles.checkButtonText}>
                {"Kiểm tra\nphạt nguội"}
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

function getVehicleTypeName(type) {
  const typeMap = {
    1: "Xe hơi",
    2: "Xe máy",
    3: "Xe điện",
  };
  return typeMap[Number(type)] || "Không xác định";
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    position: "relative",
  },
  deleteContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  deleteButton: {
    backgroundColor: "#EF4444",
    width: 60,
    height: "100%",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  deleteText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#334155",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  vehicleInfo: {
    marginLeft: 16,
    flex: 1,
  },
  plateNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F8FAFC",
    marginBottom: 4,
  },
  vehicleType: {
    fontSize: 14,
    color: "#94A3B8",
    fontWeight: "500",
  },
  checkButton: {
    backgroundColor: "#DC2626",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: "#DC2626",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  checkButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
