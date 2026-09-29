import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radius, spacing } from '../theme/theme';
import { factorial, validate, withThousandsSeparator } from '../utils/factorial';

export default function FactorialScreen() {
  const insets = useSafeAreaInsets();
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleCalculate() {
    const validation = validate(input);

    if (!validation.ok) {
      setError(validation.message);
      setResult('');
      return;
    }

    const exact = factorial(validation.value).toString();

    setError(null);
    setResult(withThousandsSeparator(exact));
  }

  function handleClear() {
    setInput('');
    setResult('');
    setError(null);
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={[
          styles.container,
          {
            paddingTop: insets.top + spacing.lg,
            paddingBottom: insets.bottom + spacing.lg,
          },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Factorial</Text>
          <Text style={styles.subtitle}>n! = 1 × 2 × 3 × ... × n</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.field}>
            <Text style={styles.label}>Número</Text>
            <TextInput
              value={input}
              onChangeText={(text) => {
                setInput(text);
                if (error) {
                  setError(null);
                }
              }}
              placeholder="Ej. 5"
              placeholderTextColor={colors.textMuted}
              keyboardType="number-pad"
              style={[styles.input, error ? styles.inputError : null]}
              returnKeyType="go"
              onSubmitEditing={handleCalculate}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
          </View>

          <View style={styles.actions}>
            <Pressable
              onPress={handleCalculate}
              accessibilityRole="button"
              style={({ pressed }) => [styles.calculate, pressed && styles.pressed]}
            >
              <Text style={styles.calculateLabel}>Calcular</Text>
            </Pressable>

            <Pressable
              onPress={handleClear}
              accessibilityRole="button"
              style={({ pressed }) => [styles.clear, pressed && styles.pressed]}
            >
              <Text style={styles.clearLabel}>Limpiar</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Resultado</Text>
          <TextInput
            value={result}
            editable={false}
            placeholder="Aquí aparecerá el resultado"
            placeholderTextColor={colors.textMuted}
            style={[styles.input, styles.resultInput]}
            multiline
            scrollEnabled={false}
            accessibilityLabel="Resultado del factorial"
          />
        </View>

        {result ? <Text style={styles.hint}>{input.trim()}! = {result}</Text> : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingHorizontal: spacing.md,
    gap: spacing.lg,
    flexGrow: 1,
  },
  header: {
    gap: spacing.xs,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textMuted,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.md,
  },
  field: {
    gap: spacing.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    fontSize: 17,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.danger,
  },
  resultInput: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primarySoft,
    color: colors.primaryDark,
    fontSize: 18,
    fontWeight: '700',
    minHeight: 90,
    textAlignVertical: 'top',
  },
  error: {
    fontSize: 13,
    color: colors.danger,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  calculate: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: 14,
  },
  clear: {
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
  },
  pressed: {
    opacity: 0.75,
  },
  calculateLabel: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  clearLabel: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '700',
  },
  hint: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: -spacing.sm,
  },
});
