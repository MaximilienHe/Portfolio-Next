import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";
import fs from "fs";
import path from "path";
import { cvData, computeAge } from "../../data/cv";

const photoBuffer = fs.readFileSync(
  path.resolve(process.cwd(), "public/photo.jpg")
);
const photoSrc = `data:image/jpeg;base64,${photoBuffer.toString("base64")}`;

const colors = {
  sidebarBlack: "#0B0B0B",
  accentYellow: "#E6C64A",
  textGray: "#333333",
  lightGray: "#777777",
  white: "#FFFFFF",
};

const s = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "Helvetica",
  },

  // Sidebar
  sidebar: {
    width: "34%",
    backgroundColor: colors.sidebarBlack,
    paddingTop: 45,
    paddingLeft: 28,
    paddingRight: 28,
  },
  sideLastName: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
    letterSpacing: 4,
  },
  sideFirstName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
    letterSpacing: 3,
    marginTop: 2,
  },
  sideAge: {
    fontSize: 12,
    color: colors.white,
    marginTop: 6,
  },
  photoBorder: {
    borderWidth: 3,
    borderColor: colors.accentYellow,
    alignSelf: "center",
    marginTop: 14,
    marginBottom: 14,
  },
  photo: {
    width: 140,
  },
  sideTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.white,
    letterSpacing: 3,
    marginTop: 16,
    marginBottom: 8,
  },
  sideText: {
    fontSize: 9.5,
    color: colors.white,
    lineHeight: 1.3,
  },
  sideTextSmall: {
    fontSize: 9.5,
    color: colors.white,
    lineHeight: 1.3,
    marginBottom: 6,
  },
  sideInterestTitle: {
    fontSize: 9.5,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 4,
  },
  sideInterestDesc: {
    fontSize: 9,
    color: colors.white,
    lineHeight: 1.35,
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  contactIcon: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.white,
    marginRight: 6,
    width: 16,
  },
  contactLink: {
    fontSize: 9.5,
    color: colors.white,
    textDecoration: "none",
  },

  // Main content
  main: {
    width: "66%",
    backgroundColor: colors.white,
    paddingTop: 45,
    paddingLeft: 34,
    paddingRight: 34,
  },

  // Quote
  quoteContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  quoteMarks: {
    fontSize: 46,
    color: colors.accentYellow,
    fontWeight: "bold",
    lineHeight: 0.8,
    marginRight: 4,
    marginTop: -4,
  },
  quoteText: {
    fontSize: 10.6,
    color: colors.textGray,
    lineHeight: 1.4,
    flex: 1,
  },

  // Section titles
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textGray,
    letterSpacing: 4,
    marginTop: 10,
    marginBottom: 8,
  },

  // Experience
  xpHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  xpTitle: {
    fontSize: 10.6,
    fontWeight: "bold",
    color: colors.textGray,
    flex: 1,
  },
  xpDate: {
    fontSize: 10.6,
    fontWeight: "bold",
    color: colors.textGray,
    flexShrink: 0,
    marginLeft: 8,
  },
  xpSubtitle: {
    fontSize: 10,
    color: colors.lightGray,
    marginTop: 2,
  },
  xpBullets: {
    marginTop: 6,
    marginLeft: 14,
    marginBottom: 8,
  },
  xpBullet: {
    flexDirection: "row",
    marginBottom: 3,
  },
  xpBulletDot: {
    fontSize: 10.6,
    color: colors.textGray,
    marginRight: 6,
  },
  xpBulletText: {
    fontSize: 10.6,
    color: colors.textGray,
    flex: 1,
    lineHeight: 1.3,
  },

  // Formation
  formItem: {
    marginBottom: 6,
  },
  formSubtitle: {
    fontSize: 10,
    color: colors.lightGray,
    marginTop: 2,
    lineHeight: 1.3,
  },

  // Skills
  skillLine: {
    fontSize: 10.6,
    color: colors.textGray,
    marginBottom: 4,
  },
  skillLabel: {
    fontWeight: "bold",
  },
  skillExtra: {
    fontSize: 10.6,
    color: colors.textGray,
    marginBottom: 4,
  },
  skillFooter: {
    fontSize: 10.3,
    color: colors.lightGray,
    marginTop: 6,
  },
});

export function CvDocument() {
  const age = computeAge(cvData.personal.birthDate);
  const { personal, quote, languages, personality, interests, experiences, formations, skills, skillsExtra, skillsFooter } = cvData;

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* ========== SIDEBAR ========== */}
        <View style={s.sidebar}>
          {/* Name */}
          <Text style={s.sideLastName}>{personal.lastName}</Text>
          <Text style={s.sideFirstName}>{personal.firstName}</Text>
          <Text style={s.sideAge}>{age} ans</Text>

          {/* Photo */}
          <View style={s.photoBorder}>
            <Image src={photoSrc} style={s.photo} />
          </View>

          {/* Contact */}
          <Text style={s.sideTitle}>CONTACT</Text>
          <View style={s.contactRow}>
            <Text style={s.contactIcon}>✉</Text>
            <Link src={`mailto:${personal.email}`} style={s.contactLink}>
              {personal.email}
            </Link>
          </View>
          <View style={s.contactRow}>
            <Text style={s.contactIcon}>in</Text>
            <Link src={personal.linkedinUrl} style={s.contactLink}>
              {personal.linkedin}
            </Link>
          </View>

          {/* Langues */}
          <Text style={s.sideTitle}>LANGUES</Text>
          {languages.map((lang, i) => (
            <Text key={i} style={s.sideTextSmall}>
              {lang.name} : niveau {lang.level}
            </Text>
          ))}

          {/* Personnalité */}
          <Text style={s.sideTitle}>PERSONNALITÉ</Text>
          {personality.map((trait, i) => (
            <Text key={i} style={s.sideTextSmall}>
              {trait}
            </Text>
          ))}

          {/* Intérêts */}
          <Text style={s.sideTitle}>INTÉRÊTS</Text>
          {interests.map((interest, i) => (
            <View key={i}>
              <Text style={s.sideInterestTitle}>{interest.title}</Text>
              <Text style={s.sideInterestDesc}>{interest.description}</Text>
            </View>
          ))}
        </View>

        {/* ========== MAIN CONTENT ========== */}
        <View style={s.main}>
          {/* Quote */}
          <View style={s.quoteContainer}>
            <Text style={s.quoteMarks}>{"\u201C"}</Text>
            <Text style={s.quoteText}>{quote}</Text>
          </View>

          {/* Expériences */}
          <Text style={s.sectionTitle}>EXPÉRIENCES</Text>
          {experiences.map((xp, i) => (
            <View key={i}>
              <View style={s.xpHeader}>
                <Text style={s.xpTitle}>{xp.title}</Text>
                <Text style={s.xpDate}>{xp.date}</Text>
              </View>
              <Text style={s.xpSubtitle}>{xp.subtitle}</Text>
              <View style={s.xpBullets}>
                {xp.bullets.map((bullet, j) => (
                  <View key={j} style={s.xpBullet}>
                    <Text style={s.xpBulletDot}>•</Text>
                    <Text style={s.xpBulletText}>{bullet}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}

          {/* Formation */}
          <Text style={s.sectionTitle}>FORMATION</Text>
          {formations.map((f, i) => (
            <View key={i} style={s.formItem}>
              <View style={s.xpHeader}>
                <Text style={s.xpTitle}>{f.title}</Text>
                <Text style={s.xpDate}>{f.date}</Text>
              </View>
              <Text style={s.formSubtitle}>{f.subtitle}</Text>
            </View>
          ))}

          {/* Compétences */}
          <Text style={s.sectionTitle}>COMPÉTENCES</Text>
          {skills.map((skill, i) => (
            <Text key={i} style={s.skillLine}>
              <Text style={s.skillLabel}>{skill.label} : </Text>
              {skill.value}
            </Text>
          ))}
          <Text style={s.skillExtra}>{skillsExtra}</Text>
          <Text style={s.skillFooter}>{skillsFooter}</Text>
        </View>
      </Page>
    </Document>
  );
}
