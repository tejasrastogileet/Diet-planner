import { useMealPlan } from '@/components/MealPlanContext';
import { useTheme } from '@/components/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const ProfileScreen = () => {
  const { getTotalNutrition, nutritionalData } = useMealPlan();
  const { theme, colors } = useTheme();
  const totalNutrition = getTotalNutrition();

  const ProfileCard = ({ 
    icon, 
    color, 
    title, 
    value, 
    subtitle 
  }: { 
    icon: string; 
    color: string; 
    title: string; 
    value: string; 
    subtitle?: string; 
  }) => (
    <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
      <View style={[styles.profileIcon, { backgroundColor: color }]}>
        <Ionicons name={icon as any} size={20} color="white" />
      </View>
      <View style={styles.profileContent}>
        <Text style={[styles.profileTitle, { color: colors.textSecondary }]}>{title}</Text>
        <Text style={[styles.profileValue, { color: colors.text }]}>{value}</Text>
        {subtitle && <Text style={[styles.profileSubtitle, { color: colors.textTertiary }]}>{subtitle}</Text>}
      </View>
    </View>
  );

  const AchievementCard = ({ 
    icon, 
    title, 
    description, 
    achieved 
  }: { 
    icon: string; 
    title: string; 
    description: string; 
    achieved: boolean; 
  }) => (
    <View style={[styles.achievementCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }, achieved && styles.achievementCardAchieved]}>
      <View style={[styles.achievementIcon, achieved && styles.achievementIconAchieved]}>
        <Ionicons name={icon as any} size={20} color={achieved ? "#4CAF50" : colors.textTertiary} />
      </View>
      <View style={styles.achievementContent}>
        <Text style={[styles.achievementTitle, { color: achieved ? colors.text : colors.textTertiary }, achieved && styles.achievementTitleAchieved]}>
          {title}
        </Text>
        <Text style={[styles.achievementDescription, { color: colors.textSecondary }]}>{description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="settings-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userSection}>
          <View style={[styles.avatarContainer, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <View style={[styles.avatar, { backgroundColor: colors.accent }]}>
              <Text style={styles.avatarText}>T</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: colors.text }]}>{'Tejas'}</Text>
              <Text style={[styles.userEmail, { color: colors.textSecondary }]}>{'tejasrastogi456@gmail.com'}</Text>
            </View>
          </View>
        </View>

        {/* Stats Overview */}
        <View style={styles.statsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Stats</Text>
          <View style={styles.statsGrid}>
            <ProfileCard
              icon="flame"
              color="#FFC107"
              title="Total Calories"
              value={`${totalNutrition.calories} kcal`}
              subtitle={`${Math.round((totalNutrition.calories / nutritionalData.calories) * 100)}% of daily goal`}
            />
            <ProfileCard
              icon="trophy"
              color="#FFD700"
              title="Streak"
              value="7 days"
              subtitle="Current streak"
            />
            <ProfileCard
              icon="checkmark-circle"
              color="#4CAF50"
              title="Meals Completed"
              value="3/4"
              subtitle="Today's progress"
            />
            <ProfileCard
              icon="trending-up"
              color="#2196F3"
              title="Weekly Average"
              value="85%"
              subtitle="Goal completion"
            />
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Achievements</Text>
          <AchievementCard
            icon="star"
            title="First Week"
            description="Complete 7 days of meal planning"
            achieved={true}
          />
          <AchievementCard
            icon="nutrition"
            title="Protein Master"
            description="Meet protein goals for 5 consecutive days"
            achieved={true}
          />
          <AchievementCard
            icon="leaf"
            title="Healthy Eater"
            description="Stay within calorie goals for 10 days"
            achieved={false}
          />
          <AchievementCard
            icon="fitness"
            title="Consistency King"
            description="Plan meals for 30 consecutive days"
            achieved={false}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              <Ionicons name="person-outline" size={20} color={colors.accent} />
              <Text style={[styles.actionText, { color: colors.text }]}>Edit Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              <Ionicons name="notifications-outline" size={20} color={colors.accent} />
              <Text style={[styles.actionText, { color: colors.text }]}>Notifications</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              <Ionicons name="help-circle-outline" size={20} color={colors.accent} />
              <Text style={[styles.actionText, { color: colors.text }]}>Help & Support</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              <Ionicons name="share-outline" size={20} color={colors.accent} />
              <Text style={[styles.actionText, { color: colors.text }]}>Share Progress</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerSection}>
          <Text style={[styles.footerText, { color: colors.textSubtle }]}>Made with ❤ by Tejas</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  headerButton: {
    padding: 8,
  },
  userSection: {
    paddingHorizontal: 24,
    marginBottom: 28,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EDEDED',
    shadowColor: 'rgba(0,0,0,0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#4A6CF7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#707070',
    fontWeight: '500',
  },
  statsSection: {
    paddingHorizontal: 24,
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  statsGrid: {
    gap: 14,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EDEDED',
    shadowColor: 'rgba(0,0,0,0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  profileIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  profileContent: {
    flex: 1,
  },
  profileTitle: {
    fontSize: 13,
    color: '#707070',
    marginBottom: 4,
    fontWeight: '500',
  },
  profileValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  profileSubtitle: {
    fontSize: 12,
    color: '#A8A8A8',
    fontWeight: '500',
  },
  achievementsSection: {
    paddingHorizontal: 24,
    marginBottom: 28,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    opacity: 0.6,
    borderWidth: 1,
    borderColor: '#EDEDED',
    shadowColor: 'rgba(0,0,0,0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  achievementCardAchieved: {
    opacity: 1,
  },
  achievementIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EDEDED',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  achievementIconAchieved: {
    backgroundColor: '#A8E6CF',
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#A8A8A8',
    marginBottom: 4,
  },
  achievementTitleAchieved: {
    color: '#1A1A1A',
  },
  achievementDescription: {
    fontSize: 13,
    color: '#707070',
    fontWeight: '500',
  },
  actionsSection: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  actionButtons: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: '#EDEDED',
    shadowColor: 'rgba(0,0,0,0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  actionText: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '700',
  },
  footerSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#9A9A9A',
    fontWeight: '500',
  },
}); 