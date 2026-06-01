
# NeuralRetail — Project Summary | Data Science Analyst

**Project Code:** AMX-DS-2026-04 | **Organization:** Amdox Technologies | **April 2026**

---

## Project Overview

Engineered **NeuralRetail**, an end-to-end, production-grade **AI-Powered Sales Intelligence & Predictive Analytics Platform** for enterprise retail, FMCG, and e-commerce clients — processing **15M+ daily transactions** and delivering demand forecasts, customer intelligence, churn predictions, and inventory optimization through an interactive dashboard and REST API.

---

## Key Contributions & Responsibilities

### Data Engineering & ETL Pipeline
- Designed and implemented a scalable **Lakehouse architecture** using **Apache Spark + Delta Lake**, ingesting multi-source data (POS transactions, ERP inventory feeds, e-commerce events, weather APIs, competitor pricing) into Bronze/Silver layers with full **schema enforcement** and **data versioning**.
- Integrated **Great Expectations** data quality gates directly into **Apache Airflow DAGs**, achieving a **DQ score ≥ 98%** with zero silent failures, and emitted **OpenLineage** metadata to Marquez for end-to-end data lineage tracking.
- Built a **Feast Feature Store** (Redis online store + S3 offline store) with **point-in-time correct** training dataset retrieval to eliminate data leakage — serving features at **< 5ms latency** during live API inference.

### Machine Learning & Advanced Modelling
- Developed a **hybrid Prophet + PyTorch Lightning LSTM ensemble** demand forecasting system, achieving **MAPE ≤ 10%** on a 30-day horizon with **probabilistic quantile outputs** (q10/q50/q90) for safety-stock interval estimation. Ensemble weights optimized via **Optuna Bayesian hyperparameter tuning**.
- Built a **stacked XGBoost + LightGBM churn classifier** (meta-learner: Logistic Regression) with **AUC-ROC ≥ 0.90**, handling class imbalance via **SMOTE-NC**, threshold-optimized via Precision-Recall analysis at 0.35 for maximum business utility.
- Implemented **SHAP TreeExplainer** for global and local model interpretability, generating waterfall, beeswarm, and dependence plots — plus a **business translation layer** converting raw SHAP values into plain-language retention action recommendations.
- Conducted **customer segmentation** using **K-Means, DBSCAN, and Gaussian Mixture Models**, achieving **Silhouette Score ≥ 0.55** across 6–10 stable, labelled business personas (e.g., "At-Risk Loyalists", "Bargain Hunters").
- Applied **DoWhy causal inference** and **EconML Double ML** for price elasticity modelling and promotion lift attribution, building a what-if revenue simulator with **causal R² ≥ 0.72** and **< 2s** response time.
- Implemented **EOQ + safety-stock inventory optimization** with ABC-XYZ classification, producing automated purchase order recommendations targeting a **30–50% stockout reduction**.

### Feature Engineering
- Engineered **RFM scores**, 7/14/30-day **rolling means and standard deviations**, t-1/t-7/t-14 **lag features**, day-of-week/holiday flags, and external weather/CPI regressors using **Polars** for high-performance batch computation.
- Applied **STL decomposition**, **ADF/KPSS stationarity tests**, ACF/PACF analysis, and multi-seasonality detection to inform time-series model architecture decisions.

### MLOps & Production Readiness
- Configured **MLflow** (PostgreSQL backend + S3 artifact store) for full experiment tracking, model versioning, and **champion/challenger** promotion gates — ensuring every production model is traceable to its exact Git SHA and training data snapshot.
- Built automated **Evidently AI** drift detection pipeline (PSI + KS tests), auto-triggering **Airflow retraining DAGs** on PSI > 0.2 — achieving drift detection in **< 24 hours** and retraining in **< 20 minutes** with zero-downtime model swaps.
- Established complete **CI/CD pipeline** via **GitHub Actions**: linting (Ruff/Black) → pytest unit/integration tests → model metric validation gate (MAPE ≤ 12%, AUC ≥ 0.88) → Docker build/push → **ArgoCD GitOps** deployment.

### API Development & Dashboard
- Built a high-throughput **FastAPI + Uvicorn** REST scoring API with **Pydantic v2** schema validation, **Redis caching** for SKU-level forecasts, JWT authentication, and sliding-window rate limiting — delivering **P95 latency < 1.5s**.
- Developed a **5-page Streamlit interactive dashboard** with role-based access control (RBAC), Plotly visualizations, SHAP chart rendering, what-if simulators, and PDF/Excel export via ReportLab — achieving **Lighthouse score ≥ 85**.

### Deployment & Infrastructure
- Containerized all services using **multi-stage Distroless Dockerfiles** (< 500MB images, non-root execution, read-only filesystem, CAP_DROP ALL) and deployed via **Kubernetes + Helm charts** with **HPA autoscaling** at 70% CPU.
- Deployed to **AWS** (EC2/ECS/RDS Aurora/ElastiCache Redis) with HTTPS via Let's Encrypt; validated under **k6 load testing** at 200 concurrent virtual users maintaining P95 < 1.5s.
- Set up **Prometheus + Grafana + Loki** observability stack with OpenTelemetry distributed tracing and PagerDuty alerting.

---

## Business Impact Delivered

| Outcome | Target Achieved |
|---|---|
| Stockout Reduction | ↓ 30–50% |
| Revenue Uplift (GMV per SKU) | ↑ 15–25% |
| Customer Retention | ↓ 20–35% churn |
| Forecast Accuracy | MAPE ≤ 10% |
| Batch Throughput | 15M+ txns < 4 min |

---

## Core Skills Demonstrated

`Python 3.12` · `PySpark` · `Delta Lake` · `Pandas` · `Polars` · `NumPy` · `Scikit-learn` · `XGBoost` · `LightGBM` · `PyTorch Lightning` · `Prophet` · `SHAP` · `Optuna` · `Feast Feature Store` · `MLflow` · `Apache Airflow` · `Evidently AI` · `FastAPI` · `Streamlit` · `Plotly` · `DoWhy` · `EconML` · `Great Expectations` · `Docker` · `Kubernetes` · `Helm` · `GitHub Actions` · `Prometheus` · `Grafana` · `Redis` · `PostgreSQL` · `AWS` · `CI/CD` · `MLOps` · `A/B Testing` · `Causal Inference` · `Time-Series Forecasting` · `Customer Segmentation` · `Churn Prediction` · `RFM Analysis` · `GDPR Compliance` · `REST API Design`

**NeuralRetail – AI-Powered Retail Analytics Platform**

Built an end-to-end ML platform processing **15M+ daily transactions** using **Python, Pandas, NumPy, Scikit-learn, XGBoost, LightGBM, and Prophet**. Engineered **RFM segmentation**, rolling lag features, and temporal signals via **Polars/Spark ETL** pipelines on **Delta Lake**. Developed a **Prophet + LSTM ensemble** achieving **≤10% MAPE** on 30-day demand forecasts. Built a **stacked XGBoost/LightGBM churn classifier** with **AUC-ROC ≥ 0.90** and **SHAP explainability**. Applied **DoWhy causal inference** for price elasticity modeling. Deployed interactive **Streamlit dashboards** (5 pages) with **Plotly** visualizations and **FastAPI** REST scoring endpoints. Implemented **MLOps pipelines** using **MLflow experiment tracking**, **Evidently AI drift detection**, and **Airflow DAG orchestration** with auto-retraining. Containerized services via **Docker/Kubernetes** with CI/CD on **GitHub Actions**. Maintained **Great Expectations** data quality gates and **Feast feature store**.

**Skills:** EDA · Feature Engineering · Predictive Modeling · NLP · MLOps · SQL · Data Visualization · Statistical Analysis · A/B Testing · Python

NeuralRetail | AI Retail Intelligence Platform
Engineered end-to-end ML pipeline on 15M+ transactions — Prophet+LSTM ensemble (MAPE ≤10%), XGBoost churn classifier (AUC ≥0.90), and DoWhy causal price elasticity. Built RFM segmentation, Feast feature store, Evidently AI drift detection, and Airflow auto-retraining DAGs. Deployed FastAPI + Streamlit dashboards with MLflow tracking, Docker/Kubernetes, and CI/CD pipelines.
Stack: Python · Spark · XGBoost · LightGBM · SHAP · Delta Lake · Redis · Plotly



