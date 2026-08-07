{{- define "angular-devops.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "angular-devops.fullname" -}}
{{- printf "%s-%s" .Release.Name (include "angular-devops.name" .) | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "angular-devops.labels" -}}
app.kubernetes.io/name: {{ include "angular-devops.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{- define "angular-devops.selectorLabels" -}}
app.kubernetes.io/name: {{ include "angular-devops.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}
