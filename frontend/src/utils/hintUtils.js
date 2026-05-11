export const getHintLevel = (attempts, userLevel) => {
  if (userLevel === "Advanced") return 3;
  if (userLevel === "Intermediate") {
    if (attempts >= 2) return 3;
    return 2;
  }
  // Beginner
  if (attempts >= 3) return 3;
  if (attempts >= 2) return 2;
  return 1;
};