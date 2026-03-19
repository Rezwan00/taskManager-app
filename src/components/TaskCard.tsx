import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Task, Priority, useTasks } from '../context/TaskContext';
import { COLORS, SPACING, FONT_SIZE, RADIUS } from '../theme';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const PRIORITY_CONFIG: Record<Priority, { color: string; label: string }> = {
  high:   { color: '#EF4444', label: 'High' },
  medium: { color: '#F59E0B', label: 'Medium' },
  low:    { color: '#10B981', label: 'Low' },
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const { toggleTask, deleteTask } = useTasks();
  const priority = PRIORITY_CONFIG[task.priority];

  const handleDelete = useCallback(() => {
    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${task.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTask(task.id),
        },
      ]
    );
  }, [task.id, task.title, deleteTask]);

  const formattedDate = new Date(task.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <View style={[styles.card, task.completed && styles.cardCompleted]}>
      {/* Priority indicator bar */}
      <View style={[styles.priorityBar, { backgroundColor: priority.color }]} />

      <View style={styles.content}>
        {/* Header row */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => toggleTask(task.id)}
            activeOpacity={0.7}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: task.completed }}
            accessibilityLabel={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
          >
            <Text style={styles.checkboxText}>{task.completed ? '✓' : ''}</Text>
          </TouchableOpacity>

          <Text
            style={[styles.title, task.completed && styles.titleCompleted]}
            numberOfLines={2}
          >
            {task.title}
          </Text>
        </View>

        {/* Description */}
        {task.description ? (
          <Text
            style={[styles.description, task.completed && styles.descriptionCompleted]}
            numberOfLines={2}
          >
            {task.description}
          </Text>
        ) : null}

        {/* Footer row */}
        <View style={styles.footerRow}>
          <View style={[styles.priorityBadge, { backgroundColor: priority.color + '20' }]}>
            <View style={[styles.priorityDot, { backgroundColor: priority.color }]} />
            <Text style={[styles.priorityText, { color: priority.color }]}>
              {priority.label}
            </Text>
          </View>

          <Text style={styles.date}>{formattedDate}</Text>

          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => onEdit(task)}
              style={styles.actionBtn}
              accessibilityLabel={`Edit task ${task.title}`}
            >
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              style={styles.actionBtn}
              accessibilityLabel={`Delete task ${task.title}`}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardCompleted: {
    opacity: 0.6,
  },
  priorityBar: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.xs,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginRight: SPACING.sm,
    marginTop: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary + '15',
  },
  checkboxText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  title: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.text,
    lineHeight: 22,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.textMuted,
  },
  description: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    lineHeight: 18,
    marginLeft: 30,
  },
  descriptionCompleted: {
    color: COLORS.textMuted,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
    marginRight: SPACING.sm,
  },
  priorityDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginRight: 4,
  },
  priorityText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '600',
  },
  date: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textMuted,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  editText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.primary,
    fontWeight: '600',
  },
  deleteText: {
    fontSize: FONT_SIZE.xs,
    color: '#EF4444',
    fontWeight: '600',
  },
});

export default TaskCard;
